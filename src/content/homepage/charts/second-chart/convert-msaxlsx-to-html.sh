#! /bin/bash
#
# Background:
# This script can be used to import an XLSX file that contains MSA codes and
# names. These fields will be pulled out and placed into an html formatted file
# that can be used by hmda-explorer.

HTMLDROPDOWN_FILE="msa-dropdown.html"
CSVBACKEND_FILE="msa-backend.csv"
TMPCSV="tmp-msa.csv"
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

# This gracefully handles unicode nastiness, thankfully.
xlsx2csv -d '|' "$1" $TMPCSV
# make the html dropdown
echo '<select name="hmda_chart_2_msa" id="hmda_chart_2_msa">
<option selected value="CBSA00000">U.S. Total</option>' > $HTMLDROPDOWN_FILE
awk -F "|" '{ if(NR>1){print("<option value=\"CBSA"$'$CODE_COLUMN'"\">"$'$TEXT_COLUMN'"</option>")}}' $TMPCSV >> $HTMLDROPDOWN_FILE
echo '</select>' >> $HTMLDROPDOWN_FILE
echo 'successfully created: '$HTMLDROPDOWN_FILE

# make a csv for backend use
awk -F "|" '{ if(NR>1){print($'$CODE_COLUMN'",","\""$'$TEXT_COLUMN'"\"")}}' $TMPCSV >> $CSVBACKEND_FILE
echo 'successfully created: '$CSVBACKEND_FILE

# cleanup tmp file
rm $TMPCSV

