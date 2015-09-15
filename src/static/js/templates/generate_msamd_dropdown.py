#!/usr/bin/env python
from argparse import ArgumentParser
from re import match
from urllib2 import urlopen
from csv import DictReader
from shutil import copy
from sys import exit
from datetime import datetime

DEFAULT_URL = 'https://github.com/cfpb/api/raw/master/resources/datasets/hmda/code_sheets/msamd.csv'

# Parse the command line arguments
parser = ArgumentParser()
group = parser.add_mutually_exclusive_group()
group.add_argument("-u", "--url", help="URL to use as the CSV data source")
group.add_argument("-f", "--file", help="File to use as the CSV data source")
parser.add_argument("-o", "--out", help="HTML file to backup and update")
args = parser.parse_args()

csv_feed = None
if args.url:
    # If the url is a github file, and is an html link rather than a raw link,
    # update the url to refer to the raw file
    github_regex = '.*github.*/blob/.*'
    if match(github_regex, args.url):
        csv_url = str.replace(args.url, '/blob/', '/raw/', 1)
    else:
        csv_url = args.url
    csv_feed = urlopen(csv_url)
elif args.file:
    csv_feed = open(args.file)
else:
    csv_feed = urlopen(DEFAULT_URL)


def rangeify(years_list):
    # given an array of integers, return an array of strings where any
    # sequential numbers are combined into a range.
    #
    # e.g. [2009, 2011, 2012, 2013] -> ['2009', '2011-2013']

    years_list = sorted(years_list)
    newlist = []
    start = None

    for (idx, item) in enumerate(years_list):
        if idx < len(years_list)-1 and item+1 == years_list[idx+1]:
            # if the next number is one more than the current,
            # then we've got a range.  if not already part of a range,
            # start one by defining 'start'
            if not start:
                start = item
        else:
            # if the current and next number are not part of a range,
            # either close out the current range or add the solo number
            if start:
                newlist.append('%d-%d' % (start, item))
                start = None
            else:
                newlist.append(str(item))
    return newlist


# DictReader is an iterator.  Since we need to iterate over the data more than
# once, and urllib2 objects can't reset back to the beginning, we need to save
# this data to a normal array (sad face)
csv_iterator = DictReader(csv_feed)
csv_content = []
for row in csv_iterator:
    csv_content.append(row)

# Get total list of msa codes
codes = sorted(set([line['code'] for line in csv_content]))
# Do not print the "NA" MSA if it appears in the CSV
if '99999' in codes:
    codes.remove('99999')
all_years = set([int(line['year']) for line in csv_content])


# Print HTML with latest name. Also, if the code is not present for all years,
# print the list of years after the name.
html_msa_list = []
for code in codes:
    code_filter = [row for row in csv_content if row['code'] == code]
    latest_record = max(code_filter, key=lambda item: item['year'])
    years_list = [int(record['year']) for record in code_filter]
    if all_years == set(years_list):
        html_msa_list.append('<option value="%s">%s</option>' %
                             (latest_record['code'],
                              latest_record['name']))
    else:
        html_msa_list.append('<option value="%s">%s (%s)</option>' %
                             (latest_record['code'],
                              latest_record['name'],
                              ', '.join(rangeify(years_list))))

if not args.out:
    for line in html_msa_list:
        print line
else:
    # If an output file is specified:
    #  1. Backup the file
    #  2. Try to parse the file, expecting a <select> block for msamd
    #  3. Pull out the old select fields and insert the new list
    #  4. Write the new content over the original file

    # Backup the file
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    copy(args.out, "%s.%s" % (args.out, timestamp))

    with open(args.out) as htmlfile:
        original_html = htmlfile.read().split('\n')

    # Try to parse the file, expecting a <select> block for msamd
    select_start_regex = '.*<select.*name="msamd-.*'
    select_end_regex = '.*</select>.*'
    cut_start_index = -1
    cut_end_index = -1
    for (idx, line) in enumerate(original_html):
        if match(select_start_regex, line):
            # the first MSA record is 2 lines after the select line
            cut_start_index = idx + 2
            next

        if cut_start_index > 0 and match(select_end_regex, line):
            # the last MSA record is the line before the closed select
            cut_end_index = idx
            break

    if cut_end_index < 0:
        print "Unable to locate the MSA block of the file: %s" % args.out
        exit(1)

    # Pull out the old select fields and insert the new list
    # Write the new content over the original file
    with open(args.out, 'w') as htmlfile:
        for line in range(0, cut_start_index):
            htmlfile.write(original_html[line] + "\n")

        for line in html_msa_list:
            htmlfile.write('        ' + line + "\n")

        for line in range(cut_end_index, len(original_html)-1):
            htmlfile.write(original_html[line] + "\n")
        # print the last line without a newline
        htmlfile.write(original_html[-1])

