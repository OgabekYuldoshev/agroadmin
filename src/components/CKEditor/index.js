import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const CKEditorComponent = ({ onReady, onChange, onBlur, onFocus }) => {
    return (
        <>
            <CKEditor
                editor={ClassicEditor}
                onReady={onReady}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
            />
        </>
    )
}
export default CKEditorComponent