#! /bin/bash
#
# Background:
# This script can be used to import an XLSX file that contains MSA codes and
# names. These fields will be pulled out and placed into an html formatted file
# that can be used by hmda-explorer. The script will also create a CSV file
# for use by other applications.
#
# The expected input format:
#     code column: MSA code (e.g. 47894)
#     text_column: MSA name (e.g. "WASHINGTON-ARLINGTON-ALEXANDRIA, DC-VA-MD-WV")
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
TEXT_COLUMN=2

OPTIONS_GUIDE="Usage: convert-msalsx-to-html.sh [-c code-column] [-t text-column] [-o html-output-file] [-b csv-output-file] input-file
    -c	Default: $CODE_COLUMN
    -t	Default: $TEXT_COLUMN
    -o	Default: $HTMLDROPDOWN_FILE
    -b	Default: $CSVBACKEND_FILE
"

# Pull out the command line arguments (if any)
while getopts ":c:t:o:b:h" opt; do
    case $opt in
        c)
            CODE_COLUMN=$OPTARG
            ;;
        t)
            TEXT_COLUMN=$OPTARG
            ;;
        o)
            HTMLDROPDOWN_FILE=$OPTARG
            ;;
        b)
            CSVBACKEND_FILE=$OPTARG
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

# Use xlsx2csv to convert the xlsx file: https://github.com/dilshod/xlsx2csv
# If xlsx2csv is not installed, exit
command -v xlsx2csv 2> /dev/null || {
    echo >&2 "'xlsx2csv' is required for this script to execute. To install, run:
pip install xlsx2csv 
Note that root access may be required to run pip commands. Aborting.";
    exit 1;
} 

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
  s/\([A-Z]\)-\([A-Z]\)/\1, \2/g;

  # remove "CBSA" from MSA codes, if present
  s/CBSA\([0-9]\{5\}\)/\1/;

  # lowercase words (2+ chars), but keep the first letter capitalized
  s/\b\([[:alpha:]]\)\([[:alpha:]]\+\)\b/\u\1\L\2/g;

  # uppercase any words that follow " - ", as those are state abbreviations
  s/\( \- \(\(, \)\?[A-Z][a-z]\)\+\)/\U\1/;

  # special case - uppercase the abbreviations in MSA #99999
  s/Na (Outside Of Msa\/Md)/NA (Outside Of MSA\/MD)/;

  # Remove MSA 00000, if present
  /00000[,|]/d;

  # remove quotes from lines without commas
  s/"\([^,]\+\)"/\1/;
'

# make a csv for backend usage
# xlsx2csv gracefully handles unicode nastiness, thankfully.
xlsx2csv "$1" | $sed_bin "$sed_tweaks" > $CSVBACKEND_FILE
echo 'successfully created: '$CSVBACKEND_FILE

# make the html dropdown
xlsx2csv -d '|' "$1" | $sed_bin "$sed_tweaks" | awk -F "|" '{print("<option value=\""$'$CODE_COLUMN'"\">"$'$TEXT_COLUMN'"</option>")}' > $HTMLDROPDOWN_FILE
echo 'successfully created: '$HTMLDROPDOWN_FILE
