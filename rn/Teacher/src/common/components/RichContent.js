// @flow

import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import tokenize from 'hyntax/lib/tokenize'
import constructTree from 'hyntax/lib/construct-tree'
import { AllHtmlEntities as Entities } from 'html-entities'

const entities = new Entities()

type Props = {
  html: ?string,
  navigator: Navigator,
}

export default class RichContent extends Component<Props, *> {
  static supportedTags = [
    'p', 'i', 'font', 'span', 'a', 'b', 'br', 'div',
  ]

  attributesToProps = (attributes: any) => {
    return attributes.reduce((props, attribute) => {
      switch (attribute.key.content) {
        case 'style':
          let styles = attribute.value.content
          styles = styles.split(/;\s*?/)
          styles = styles
            .filter(rule => rule)
            .reduce((style, rule) => {
              let parts = rule.split(/:\s?/)
              let regex = new RegExp('-([a-z])', 'i')
              let match
              /* eslint-disable no-cond-assign */
              while ((match = regex.exec(parts[0])) != null) {
                // $FlowFixMe
                parts[0] = parts[0].replace(match[0], match[1].toUpperCase())
              }
              style[parts[0].trim()] = parts[1].trim()
              return style
            }, {})
          props['style'] = props['style'] || {}
          props['style'] = {
            ...props['style'],
            ...styles,
          }
          break
        case 'color':
          props['style'] = props['style'] || {}
          props['style']['color'] = attribute.value.content
          break
        case 'href':
          props['onPress'] = () => this.navigate(attribute.value.content)
          break
        case 'data-api-endpoint':
        case 'data-api-returntype':
          props['data'] = props['data'] || {}
          props['data'][attribute.key.content] = attribute.value.content
          break
        default:
          console.log('Missing attribute', attribute.key.content)
      }
      return props
    }, {})
  }

  maybeIncludeLeadingNewLine = (html: any): string => {
    let index = html.parentRef.content.children.findIndex(c => c === html) || 0

    if (index === 0 && html.parentRef.nodeType !== 'document' && !['div', 'p'].includes(html.parentRef.content.name)) {
      return '\n'
    }

    let previousSibling = html.parentRef.content.children[index - 1]
    if (previousSibling && !['div', 'p'].includes(previousSibling.content.name)) {
      return '\n'
    }

    return ''
  }

  maybeIncludeTrailingNewLine = (html: any): string => {
    let index = html.parentRef.content.children.findIndex(c => c === html) || 0

    if (html.parentRef.content.children.length - 1 !== index) {
      return '\n'
    }

    if (html.parentRef.content.children.length - 1 === index &&
        html.parentRef.nodeType !== 'document' &&
        !['div', 'p'].includes(html.parentRef)) {
      return '\n'
    }

    return ''
  }

  renderHTML = (html: any, index: number) => {
    let props = this.attributesToProps(html.content.attributes || [])
    let children = html.content.children || []
    switch (html.content.name) {
      case 'p':
        return (
          <Text {...props} style={[styles.font, props.style]} key={index}>
            {this.maybeIncludeLeadingNewLine(html)}
            {children.map(this.renderAST)}
            {this.maybeIncludeTrailingNewLine(html)}
          </Text>
        )
      case 'i':
        let { style: iStyle, ...iProps } = props
        return (
          <Text
            {...iProps}
            style={[styles.font, styles.italicized, iStyle]}
            key={index}
          >
            {children.map(this.renderAST)}
          </Text>
        )
      case 'div':
        return (
          <Text {...props} style={[styles.font, props.style]} key={index}>
            {this.maybeIncludeLeadingNewLine(html)}
            {children.map(this.renderAST)}
            {this.maybeIncludeTrailingNewLine(html)}
          </Text>
        )
      case 'font':
      case 'span':
        return (
          <Text {...props} style={[styles.font, props.style]} key={index}>
            {children.map(this.renderAST)}
          </Text>
        )
      case 'a':
        return (
          <Text
            {...props}
            style={[styles.font, props.style, styles.link]}
            accessibilityTraits='button'
            key={index}
          >
            {children.map(this.renderAST)}
          </Text>
        )
      case 'b':
        let { style: bStyle, ...bProps } = props
        return (
          <Text
            {...bProps}
            style={[styles.font, styles.bold, bStyle]}
            key={index}
          >
            {children.map(this.renderAST)}
          </Text>
        )
      default:
        console.log('Missing html', html.content.name)
        return null
    }
  }

  renderAST = (html: any, index?: number = 0) => {
    switch (html.nodeType) {
      case 'document':
        if (!html.content.children) return
        return html.content.children.map(this.renderAST)
      case 'tag':
        return this.renderHTML(html, index)
      case 'text':
        return entities.decode(html.content.value.content)
      default:
        console.log('Missing nodeType', html.nodeType)
        return null
    }
  }

  navigate = (url: string) => {
    this.props.navigator.show(url, {
      deepLink: true,
      modal: true,
    })
  }

  render () {
    let { tokens } = tokenize(this.props.html)
    let { ast } = constructTree(tokens)
    return (
      <Text style={styles.font}>
        {this.renderAST(ast)}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  font: {
    fontSize: 16,
  },
  italicized: {
    fontStyle: 'italic',
  },
  bold: {
    fontWeight: '600',
  },
  link: {
    color: '#368BD8',
  },
})