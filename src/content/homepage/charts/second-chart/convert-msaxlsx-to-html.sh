#! /bin/bash

HTMLDROPDOWN_FILE="msa-dropdown.html"
if [ $# -ne 1 ]; then
     echo "usage: $0 <xlsx-filename>"
     exit 1
fi

# https://github.com/dilshod/xlsx2csv (this gracefully handles unicode nastiness, thankfully).
TMPCSV="tmp-msa.csv"
xlsx2csv -d '|' $1 $TMPCSV 2> /dev/null || {
    echo >&2 "'xlsx2csv' is required for this script to execute. To install, run:
pip install xlsx2csv 
Note that root access may be required to run pip commands. Aborting.";
    exit 1;
} 

echo '<select name="hmda_chart_2_msa" id="hmda_chart_2_msa">
<option selected value="CBSA00000">U.S. Total</option>' > $HTMLDROPDOWN_FILE
awk -F "|" '{ if(NR>1){print("<option value=\"CBSA"$1"\">"$2"</option>")}}' $TMPCSV >> $HTMLDROPDOWN_FILE
echo '</select>' >> $HTMLDROPDOWN_FILE

echo 'successfully created: '$HTMLDROPDOWN_FILE

# cleanup tmp file
rm $TMPCSV
