#! /bin/bash
#
# Background:
# This script can be used to import an XLSX file that contains MSA codes and
# names. These fields will be pulled out and placed into an html formatted file
# that can be used by hmda-explorer (e.g. location.html).
#
# The script will also create a CSV file for use by other applications.
#
# The expected input format:
#     code column: MSA code (e.g. 47894)
#     name_column: MSA name (e.g. "WASHINGTON-ARLINGTON-ALEXANDRIA, DC-VA-MD-WV")
#
# The script does some cleanup on the MSA name to make it look like this:
#     Washington, Arlington, Alexandria - DC, VA, MD, WV
#
# Requirements:
#     xlsx2csv (pip install xlsx2csv)
#     sed (Mac users: install a newer version of sed: `brew install gnu-sed`)
#

HTMLDROPDOWN_FILE="msa-dropdown.html"
CSVBACKEND_FILE="msa-backend.csv"
CODE_COLUMN=1
NAME_COLUMN=2
INPUT_TYPE=csv
PREPEND_YEAR=

OPTIONS_GUIDE="Usage: convert-msalsx-to-html.sh [-c code-column] [-n name-column] [-o html-output-file] [-b csv-output-file] [-t input-type] [-y year] input-file
    -c	Default: $CODE_COLUMN
    -n	Default: $NAME_COLUMN
    -o	Default: $HTMLDROPDOWN_FILE
    -b	Default: $CSVBACKEND_FILE
    -t  Options: csv, xlsx	Default: $INPUT_TYPE
    -y  Prepend year as first column of csv
"

# Pull out the command line arguments (if any)
while getopts ":c:n:o:b:t:y:h" opt; do
    case $opt in
        c)
            CODE_COLUMN=$OPTARG
            ;;
        n)
            NAME_COLUMN=$OPTARG
            ;;
        o)
            HTMLDROPDOWN_FILE=$OPTARG
            ;;
        b)
            CSVBACKEND_FILE=$OPTARG
            ;;
        t)
            case "$OPTARG" in
                csv|xlsx)
                    INPUT_TYPE=$OPTARG
                    ;;
                *)
                    echo "Invalid file type specified" >&2
                    echo "$OPTIONS_GUIDE" >&2
                    echo 1
                    ;;
            esac
            ;;
        y)
            PREPEND_YEAR=$OPTARG
            ;;
        h)
            echo "$OPTIONS_GUIDE" >&2
            exit 0
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            echo "$OPTIONS_GUIDE" >&2
            exit 1
            ;;
    esac
done

shift $((OPTIND-1))  #This tells getopts to move on to the next argument.

if [ $# -ne 1 ]; then
     echo "Please include the input file"
     echo "$OPTIONS_GUIDE" >&2
     exit 1
fi

echo $INPUT_TYPE
if [ $INPUT_TYPE = 'xlsx' ]; then
    # Use xlsx2csv to convert the xlsx file: https://github.com/dilshod/xlsx2csv
    # If xlsx2csv is not installed, exit
    command -v xlsx2csv 2> /dev/null || {
        echo >&2 "'xlsx2csv' is required for this script to execute. To install, run:
pip install xlsx2csv 
Note that root access may be required to run pip commands. Aborting.";
        exit 1;
    }
fi

# NOTE - if using OSX, you'll need to install a newer version of sed to support these queries.
# `brew install gnu-sed` will create the gsed executable
sed_bin='sed'
command -v gsed 2> /dev/null && {
  sed_bin='gsed'
}

sed_tweaks='
  # sed input format       47894,"WASHINGTON-ARLINGTON-ALEXANDRIA, DC-VA-MD-WV",
  # sed output format      47894,"Washington, Arlington, Alexandria - DC, VA, MD, WV"
  # Note: also works if | is the delimiter

  # remove any line that does not contain a 5 character integer (MSA code)
  # i.e. remove any header rows
  /[0-9]\{5\}[,|]/!d;

  # remove the delimiter (| or ,) at the end of every line
  s/[,|]$//;

  # replace comma separating city block and state block
  s/, / - /;

  # replace hyphens between citys with comma and a space
  # also match -- and / as separators to be more flexible
  s/\([A-Z]\)\(-\|--\|\/\)\([A-Z]\)/\1, \3/g;

  # remove "CBSA" from MSA codes, if present
  s/CBSA\([0-9]\{5\}\)/\1/;

  # lowercase words (2+ chars), but keep the first letter capitalized
  s/\b\([[:alpha:]]\)\([[:alpha:]]\+\)\b/\u\1\L\2/g;

  # uppercase any words that follow " - ", as those are state abbreviations
  s/\( \- \(\(, \)\?[A-Z][a-z]\)\+\)/\U\1/;

  # special case - uppercase the abbreviations in MSA #99999
  s/Na (Outside Of Msa, Md)/NA (Outside Of MSA\/MD)/;

  # Remove MSA 00000, if present
  /00000[,|]/d;

  # remove quotes from lines without commas
  s/"\([^,]\+\)"/\1/;
'

# make a csv for backend usage
# xlsx2csv gracefully handles unicode nastiness, thankfully.
if [ $INPUT_TYPE = 'xlsx' ]; then
    dump_cmd="xlsx2csv -d '|' \"$1\""
else
    # To make the output match xlsx2csv...
    # replace only the first comma with a |
    # remove any quotes and end-of-line commas
    dump_cmd="cat $1 | $sed_bin 's/,/|/' | $sed_bin 's/,$//' | tr -d '\"'"
fi
eval $dump_cmd | awk -F '|' '{print $'$CODE_COLUMN'",\""$'$NAME_COLUMN'"\""}' | $sed_bin "$sed_tweaks" > $CSVBACKEND_FILE
if [ "$PREPEND_YEAR" != "" ]; then
    $sed_bin -i 's/^/'$PREPEND_YEAR',/' $CSVBACKEND_FILE
fi
echo 'successfully created: '$CSVBACKEND_FILE

# make the html dropdown
eval $dump_cmd | $sed_bin "$sed_tweaks" | awk -F "|" '{print("<option value=\""$'$CODE_COLUMN'"\">"$'$NAME_COLUMN'"</option>")}' > $HTMLDROPDOWN_FILE
echo 'successfully created: '$HTMLDROPDOWN_FILE
