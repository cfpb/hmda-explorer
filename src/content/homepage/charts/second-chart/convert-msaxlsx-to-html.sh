#! /bin/bash

if [ $# -ne 1 ]; then
     echo "usage: ./convert-msaxlsx.sh <xlsx-filename>"
     exit 1
fi

# https://github.com/dilshod/xlsx2csv (this gracefully handles unicode nastiness, thankfully).
pip install xlsx2csv
xlsx2csv -d '|' $1 tmp-msa.csv

echo '<select name="hmda_chart_2_msa" id="hmda_chart_2_msa">
<option selected value="CBSA00000">U.S. Total</option>' > msa-dropdown.html
awk -F "|" '{ if(NR>1){print("<option value=\"CBSA"$1"\">"$2"</option>")}}' tmp-msa.csv >> msa-dropdown.html
echo '</select>' >> msa-dropdown.html

echo 'successfully created msa-dropdown.html'

# cleanup tmp file
rm -f tmp-msa.csv
