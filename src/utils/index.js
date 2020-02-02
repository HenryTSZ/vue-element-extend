/*
 * @Author: lhajh
 * @File: 公共方法
 * @Date: 2019-07-12 13:43:21
 * @Last Modified by: lhajh
 * @Last Modified time: 2020-01-28 09:33:01
 */

const upperFirst = str => {
  return str.substring(0, 1).toUpperCase() + str.substring(1)
}

const listToTree = (list, nodeKey = 'id', parentKey = 'parentId') => {
  const tree = []
  const getParentNode = node =>
    node[parentKey] && list.filter(a => a[nodeKey] && a[nodeKey] === node[parentKey])[0]
  list.forEach(item => {
    const parentNode = getParentNode(item)
    if (!parentNode) {
      if (!Array.isArray(item.children)) {
        item.children = []
      }
      tree.push(item)
    } else {
      if (!Array.isArray(parentNode.children)) {
        parentNode.children = []
      }
      parentNode.children.push(item)
    }
  })
  return tree
}

const findTreeNodeById = (treeData, id, nodeKey = 'id', childrenKey = 'children') => {
  const node = treeData.find(item => item[nodeKey] === id)
  if (node) {
    return node
  } else if (treeData.length) {
    for (const item of treeData) {
      if (
        item[childrenKey] &&
        item[childrenKey].length &&
        findTreeNodeById(item[childrenKey], id, nodeKey, childrenKey)
      ) {
        return findTreeNodeById(item[childrenKey], id, nodeKey, childrenKey)
      }
    }
  }
}

const getTreeMaxLevel = (treeData, childrenKey = 'children') => {
  if (!treeData.length) {
    return 0
  } else {
    let max = 1
    for (const item of treeData) {
      const level = 1 + getTreeMaxLevel(item[childrenKey] || [], childrenKey)
      max = Math.max(level, max)
    }
    return max
  }
}

const formatTime = (date = null, time = true) => {
  let year = null
  let month = null
  let day = null
  let hour = null
  let minute = null

  if (date) {
    if (date.indexOf('-') > 0) {
      date = date.replace(/-/g, '/')
      date = new Date(date).getTime()
    } else {
      date = parseFloat(date)
    }
    year = new Date(date).getFullYear()
    month = new Date(date).getMonth() + 1
    day = new Date(date).getDate()
    hour = new Date(date).getHours()
    minute = new Date(date).getMinutes()
  } else {
    year = new Date().getFullYear()
    month = new Date().getMonth() + 1
    day = new Date().getDate()
    hour = new Date().getHours()
    minute = new Date().getMinutes()
  }
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minute < 10) {
    minute = '0' + minute
  }

  if (time) {
    return `${year}-${month}-${day} ${hour}:${minute}`
  } else {
    return `${year}-${month}-${day}`
  }
}

const isObject = obj => {
  return typeof obj === 'object' && obj != null
}

const deepClone = source => {
  if (!isObject(source)) return source // 非对象返回自身
  let target = Array.isArray(source) ? [] : {}
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = deepClone(source[key])
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}

const arrRemove = (arr, fun) => {
  let removed = []
  const index = arr.findIndex(fun)
  if (index !== -1) {
    removed = arr.splice(index, 1)
  }
  return removed
}

/**
 * 检测传入参数是否为 undefined
 * @param  {all} target [数据源]
 * @return {all}      [默认值]
 */
const checkParameter = (target, defaultVal) => (target === undefined ? defaultVal : target)

/**
 * 将英文字符串首字母大写
 * @param {str} String 需要转换的字符串
 * @return {srt} String 转换后的字符串
 */
const firstUpperCase = ([first, ...rest]) => first.toUpperCase() + rest.join('')

/**
 * 验证 props
 */
export const checkProps = {
  string: { type: String, default: '' },
  strDef(def = '', required = false) {
    if (typeof def !== 'string' && typeof def !== 'function') {
      console.error('props 属性默认值类型要求为 string/function, 得到的为' + typeof def)
    }
    return { type: String, required, default: def }
  },
  boolean: { type: Boolean, default: false },
  boolDef(def = false, required = false) {
    if (typeof def !== 'boolean' && typeof def !== 'function') {
      console.error('props 属性默认值类型要求为 boolean, 得到的为' + typeof def)
    }
    return { type: Boolean, required, default: def }
  },
  numDef(def = null, required = false) {
    return { type: Number, required, default: def }
  },
  anyDef(def = '', required = false) {
    return { required, default: def }
  },
  objDef(def = {}, required = false) {
    return {
      type: Object,
      required,
      default: typeof def === 'function' ? def : () => def
    }
  },
  arrDef(def = [], required = false) {
    return {
      type: Array,
      required,
      default: typeof def === 'function' ? def : () => def
    }
  }
}

export default {
  upperFirst,
  findTreeNodeById,
  getTreeMaxLevel,
  listToTree,
  formatTime,
  isObject,
  deepClone,
  arrRemove,
  checkParameter,
  firstUpperCase,
  checkProps
}
