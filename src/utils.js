const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

export function generateItemCode(){
  return ++generateItemCode.count
}

generateItemCode.count = 0
generateItemCode.reset = () => {generateItemCode.count = 0}

export function pluralRuPhrase ({ phrase, count, options = {} }) {
  const pr = new Intl.PluralRules('ru-RU', { type: 'cardinal' })

  let { one, few, many } = options
  const suffixes = new Map([
    ['one', (one ? one : '')],
    ['few', (few ? few : 'а')],
    ['many', (many ? many : '')],
  ])

  const rule = pr.select(count)
  const suffix = suffixes.get(rule)
  return `${phrase}${suffix}`
}
