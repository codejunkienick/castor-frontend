import React, {Component, PropTypes} from 'react';
import {RichUtils, Editor, EditorState} from 'draft-js';

var AlloyEditor = require('alloyeditor');

/*
 * export default class Editor extends Component {
 *   constructor(props) {
 *     super(props);
 *   }
 * 
 *   componentDidMount() {
 * 
 *     this._editor = AlloyEditor.editable(this.props.container);
 *     console.log(this._editor);
 *   }
 * 
 *   componentWillUnmount() {
 *     this._editor.destroy();
 *   }
 * 
 *   render() {
 *     return (
 *       <div id={this.props.container}>
 *         <h1>AlloyEditor will make this content editable</h1>
 *         <p>
 *           To install React, follow the instructions on <a href="https://github.com/facebook/react/">GitHub</a>.
 *         </p>
 *         <p>
 *           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel metus nunc. Maecenas rhoncus congue faucibus. Sed finibus ultrices turpis. Mauris nulla ante, aliquam a euismod ut, scelerisque nec sem. Nam dapibus ac nulla non ullamcorper. Sed vestibulum a velit non lobortis. Proin sit amet imperdiet urna. Aenean interdum urna augue, vel mollis tortor dictum vitae. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris vitae suscipit magna.
 *         </p>
 *       </div>
 *     );
 *   }
 * }
 */
export default class MyEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);

    this.focus = () => this.refs.editor.focus();
    this.onChange = this.props.onChange;

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  _handleKeyCommand(command) {
    const {editorState} = this.props;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.props.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.props.editorState,
        inlineStyle
      )
    );
  }

  render() {
    const {editorState} = this.props;
    const styles = require('./Editor.scss');

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = styles.editor;
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += styles.hidePlaceholder;
      }
    }

    return (
      <div className={styles.root}>
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
            />
            <div className={className} onClick={this.focus}>
              <Editor
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
                placeholder="Tell a story..."
                ref="editor"
                spellCheck={true}
                />
              </div>
            </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  const styles = require('./Editor.scss');
  switch (block.getType()) {
    case 'blockquote': return styles.blockquote;
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    const styles = require('./Editor.scss');
    let className = styles.styleButton;
    if (this.props.active) {
      className += ' ' + styles.activeButton;
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
        </span>
    );
  }
}

const BLOCK_TYPES = [
       {label: 'H1', style: 'header-one'},
        {label: 'H2', style: 'header-two'},
        {label: 'H3', style: 'header-three'},
        {label: 'H4', style: 'header-four'},
        {label: 'H5', style: 'header-five'},
        {label: 'H6', style: 'header-six'},
        {label: 'Blockquote', style: 'blockquote'},
        {label: 'UL', style: 'unordered-list-item'},
        {label: 'OL', style: 'ordered-list-item'},
        {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const styles = require('./Editor.scss');
  const blockType = editorState
  .getCurrentContent()
  .getBlockForKey(selection.getStartKey())
  .getType();

  return (
    <div className={styles.controls}>
    {BLOCK_TYPES.map((type) =>
                     <StyleButton
                       key={type.label}
                       active={type.style === blockType}
                       label={type.label}
                       onToggle={props.onToggle}
                       style={type.style}
                       />
                    )}
                    </div>
  );
};

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  const styles = require('./Editor.scss');
  return (
    <div className={styles.controls}>
      {INLINE_STYLES.map(type =>
                         <StyleButton
                           key={type.label}
                           active={currentStyle.has(type.style)}
                           label={type.label}
                           onToggle={props.onToggle}
                           style={type.style}
                           />
                           )}
                           </div>
  );
};
