import React, { useState } from 'react';
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './WYSIWYGEditor.scss';
import { Controller } from 'react-hook-form';
import Text from 'src/components/Text';

const WYSIWYGEditor = (props) => {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(props.defaultValue))
    )
  );
  const onEditorStateChange = (editorState, onChange) => {
    setEditorState(editorState);
    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  return (
    <>
      <Text>{props.label}</Text>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue={props.defaultValue || ''}
        render={({ field }) => (
          <div className="editor">
            <Editor
              editorState={editorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              onEditorStateChange={(editorState) =>
                onEditorStateChange(editorState, field.onChange)
              }
            />
          </div>
        )}
      />
    </>
  );
};

export default React.memo(WYSIWYGEditor);
