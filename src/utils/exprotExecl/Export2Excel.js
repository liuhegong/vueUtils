/**
 * create by zhangxiang on 2021/4/02 15:40
 * 类注释：
 * 备注：
 */
import {saveAs} from 'file-saver'

import XLSX from 'xlsx'


/**
 * table 导出
 * name 导出名称
 * @param id  table  id
 */
export function exportTableToExcel(id, name) {
  let theTable = document.getElementById(id);
  let oo = generateArray(theTable);
  let ranges = oo[1];
  let data = oo[0];
  let ws_name = "SheetJS";
  let wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);
  ws['!merges'] = ranges;
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  let wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), `${name}.xlsx`)
}

/**
 * JSON 数据导出表格
 * @param header 
 * @param data
 * @param filename
 * @param autoWidth
 */
export function exportJsonToExcel(
  {
    header,
    data,
    filename,
    autoWidth = true
  } = {}) {
  filename = filename || 'excel-list'
  data = [...data]
  data.unshift(header);
  let ws_name = "SheetJS";
  let wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);

  if (autoWidth) {
    /*设置worksheet每列的最大宽度*/
    const colWidth = data.map(row => row.map(val => {
      /*先判断是否为null/undefined*/
      if (val == null) {
        return {
          'wch': 10
        };
      }
      /*再判断是否为中文*/
      else if (val.toString().charCodeAt(0) > 255) {
        return {
          'wch': val.toString().length * 2
        };
      } else {
        return {
          'wch': val.toString().length
        };
      }
    }))
    /*以第一行为初始值*/
    let result = colWidth[0];
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j]['wch'] < colWidth[i][j]['wch']) {
          result[j]['wch'] = colWidth[i][j]['wch'];
        }
      }
    }
    ws['!cols'] = result;
  }
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;
  let wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), filename + ".xlsx");
}


/**
 * 数组导出excel
 * @param jsonAry
 * @param filename
 */
export function exportJsonArrayToExcel(jsonAry, filename) {
  let wb = new Workbook()
  filename = filename || 'excel-list'
  for (let index = 0; index < jsonAry.length; index++) {
    const element = jsonAry[index];
    element.data = [...element.data]
    element.data.unshift(element.header);
    let ws_name = element.sheetName;

    let ws = sheet_from_array_of_arrays(element.data);

    if (element.autoWidth) {
      /*设置worksheet每列的最大宽度*/
      const colWidth = element.data.map(row => row.map(val => {
        /*先判断是否为null/undefined*/
        if (val == null) {
          return {
            'wch': 10
          };
        }
        /*再判断是否为中文*/
        else if (val.toString().charCodeAt(0) > 255) {
          return {
            'wch': val.toString().length * 2
          };
        } else {
          return {
            'wch': val.toString().length
          };
        }
      }))
      /*以第一行为初始值*/
      let result = colWidth[0];
      for (let i = 1; i < colWidth.length; i++) {
        for (let j = 0; j < colWidth[i].length; j++) {
          if (result[j]['wch'] < colWidth[i][j]['wch']) {
            result[j]['wch'] = colWidth[i][j]['wch'];
          }
        }
      }
      ws['!cols'] = result;
    } else {
      ws['!cols'] = element.colslenAry
    }

    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;

    var wbout = XLSX.write(wb, {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary'
    });
  }

  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), filename + ".xlsx");
}

function generateArray(table) {
  var out = [];
  var rows = table.querySelectorAll('tr');
  var ranges = [];
  for (var R = 0; R < rows.length; ++R) {
    var outRow = [];
    var row = rows[R];
    var columns = row.querySelectorAll('td');
    for (var C = 0; C < columns.length; ++C) {
      var cell = columns[C];
      var colspan = cell.getAttribute('colspan');
      var rowspan = cell.getAttribute('rowspan');
      var cellValue = cell.innerText;
      if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

      //Skip ranges
      ranges.forEach(function (range) {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
        }
      });

      //Handle Row Span
      if (rowspan || colspan) {
        rowspan = rowspan || 1;
        colspan = colspan || 1;
        ranges.push({
          s: {
            r: R,
            c: outRow.length
          },
          e: {
            r: R + rowspan - 1,
            c: outRow.length + colspan - 1
          }
        });
      }
      ;

      //Handle Value
      outRow.push(cellValue !== "" ? cellValue : null);

      //Handle Colspan
      if (colspan)
        for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
    }
    out.push(outRow);
  }
  return [out, ranges];
};

function datenum(v, date1904) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
  var ws = {};
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = {
        v: data[R][C]
      };
      if (cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      });

      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      } else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}
