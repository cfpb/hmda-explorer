/*
 *  Tidy Table
 *  Generate a sortable HTML table from JSON
 *
 *  Copyright 2012-2013, Marc S. Brooks (http://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 *
 *  Dependencies:
 *    jquery.js
 */

(function($) {
	var methods = {
		"init" : function(options, config) {

			// default options
			var settings = {
				enableCheckbox : false,
				enableMenu     : false
			};

			if (arguments.length > 1) {
				$.extend(settings, options);
			}
			else {
				config = options;
			}

			return this.each(function() {
				var $this = $(this),
					data  = $this.data();

				if ( $.isEmptyObject(data) ) {
					$this.data({
						container : $this,
						options   : settings
					});
				}

				return createTable(data, config);
			});
		},

		"destroy" : function() {
			return this.each(function() {
				$(this).removeData();
			});
		}
	};

	$.fn.TidyTable = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else
		if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		}
		else {
			$.error('Method ' +  method + ' does not exist on jQuery.TidyTable');
		}
	};

	/*
	 * Create HTML table elements
	 */
	function createTable(data, config, num, order) {

		// create reusable elements
		var table = $('<table></table>')
			.addClass('tidy_table');

		table.mousedown(function() { return false; });
		table.mouseover(function() { return false; });

		var thead = $('<thead></thead>'),
			tbody = $('<tbody></tbody>'),
			row   = $('<tr></tr>');

		var cols = config.columnTitles;

		// .. <THEAD>
		for (var i = 0; i < cols.length; i++) {
			var title = cols[i];

			var col = $('<th></th>')
				.append(title)
				.attr('title', title);
			row.append(col);

			var col_class;

			// determine column result order
			if (order == 'desc' || !order) {
				col_class = 'sort_desc';
				col.order = 'asc';
			}
			else {
				col_class = 'sort_asc';
				col.order = 'desc';
			}

			// highlight selected column
			if (num == i) {
				col.addClass(col_class);
			}

			// attach sorting event to each column
			col.bind('click', {
				col_number : i,
				sort_order : col.order
			},
			function(event) {
				sortByColumn(data, config, event.data.col_number, event.data.sort_order);
			});
		}

		thead.append(row);

		var vals = config.columnValues;

		// .. <TBODY>
		for (var j = 0; j < vals.length; j++) {
			var row = $('<tr></tr>');

			for (var k = 0; k < vals[j].length; k++) {
				var val = vals[j][k];

				var col = $('<td></td>')
					.append(val)
					.attr('title', val);
				row.append(col);

				// post-process table column HTML object
				if (config.postProcess && typeof config.postProcess.column === 'function') {
					config.postProcess.column(col);
				}
			}

			tbody.append(row);
		}

		table.append(thead);
		table.append(tbody);

		// append check boxes to beginning each row
		if (data.options && data.options.enableCheckbox) {
			var rows = table.find('tr');

			rows.each(function(index) {
				row = $(this);

				var input = $('<input></input>')
					.attr('type','checkbox');

				var col;

				// first row is always the header
				if (index == 0) {
					col = $('<th></th>');

					// attach event to check all boxes
					input.click(function() {
						toggleSelRows(rows);
					});
				}
				else {
					col = $('<td></td>');

					// attach event to each checkbox
					input.bind('click', {
						box_number : index
					},
					function(event) {
						toggleSelRows(rows, event.data.box_number);
					});
				}

				col.append(input);

				// insert before first cell
				row.prepend(col);
			});
		}

		// post-process table results HTML object
		if (config.postProcess && typeof config.postProcess.table === 'function') {
			config.postProcess.table(table);
		}

		var $this = data.container,
			block = $this.children('table.tidy_table');

		// if table exists, perform an in-place update of the element
		if (block[0]) {
			block.replaceWith(table);
		}

		// generate table/menu elements
		else {
			if (data.options && data.options.enableMenu) {
				$this.append( createMenu($this, config, 'menu1') );
			}

			$this.append(table);

			if (data.options && data.options.enableMenu) {
				$this.append( createMenu($this, config, 'menu2') );
			}
		}

		return table;
	}

	/*
	 * Create HTML select menu element
	 */
	function createMenu(table, config, name) {
		var opts = config.menuOptions;

		// create reusable elements
		var select = $('<select></select>')
			.addClass('menu_options ' + name)
			.change(function() {
				var $this = $(this);

				var callback = opts[ $this.val() ][1]['callback'];

				// callback event
				if (typeof callback === 'function') {
					callback(getCheckedAsObj(table));
				}

				$this.val(0)
			});

		// .. options
		$.each(opts, function(index) {
			var option = $('<option>' + opts[index][0] + '</option>')
				.attr('value', index);

			select.append(option);
		});

		// post-process select menu HTML object
		if (config.postProcess && typeof config.postProcess.menu === 'function') {
			config.postProcess.menu(select);
		}

		return select;
	}

	/*
	 * Return selected row values as an array
	 */
	function getCheckedAsObj(table) {
		var rows = table.find('tbody > tr'),
			objs = [];

		for (var i = 0; i < rows.length; i++) {
			var cols = rows[i].childNodes;

			// if the row checkbox is selected
			if (cols[0].firstChild.checked) {
				var row = [];

				// simulate an associative array
				for (var j = 1; j < cols.length; j++) {
					row[j - 1] = cols[j].textContent;
				}

				objs.push(row);
			}
		}

		return objs;
	}

	/*
	 * Select/Deselect (input checkbox and row highlight)
	 */
	function toggleSelRows(rows, num) {
		var checked = null;

		rows.each(function(index) {
			var row = $(this);

			var input = row.children().find('input');

			// update all rows
			if (num == null) {
				if (index == 0) {
					checked = (input.is(':checked') ) ? true : false;
					return;
				}

				if (checked) {
					row.removeClass('check_off').addClass('check_on');
					input.attr('checked', true);
				}
				else {
					row.removeClass('check_on').addClass('check_off');
					input.attr('checked', false);
				}
			}

			// update selected row
			else {
				if (input.is(':checked')) {
					row.removeClass('check_off').addClass('check_on');
					input.attr('checked', true);
				}
				else {
					row.removeClass('check_on').addClass('check_off');
					input.attr('checked', false);
				}
			}
		});
	}

	/*
	 * Display results ordered by selected column
	 */
	function sortByColumn(data, config, num, order) {
		var reverse = (order == 'desc') ? -1 : 1;

		// sort JSON object by bucket number
		config.columnValues.sort(function(a, b) {
			var str1 = String(a[num]).replace(/$|%|#/g,''),
				str2 = String(b[num]).replace(/$|%|#/g,'');

			if (isNaN(str1) ) {
				return [reverse * cmpAny(str1, str2)] >
				       [reverse * cmpAny(str2, str1)] ? -1 : 1;
			}
			else {
				return [reverse * cmpInt(str1, str2)];
			}
		});

		createTable(data, config, num, order);
	}

	/*
	 * Generic string comparison functions
	 */
	function cmpAny(a, b) {
		return (a > b) ? 1 : (a < b) ? -1 : 0;
	}

	function cmpInt(a, b) {
		return b - a;
	}
})(jQuery);
