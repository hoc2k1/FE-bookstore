import { InputPicker } from 'rsuite';
import { checkNotEmpty } from '../../config/identify';

export const PickerInput = ({inputKey, data, placeholder, onChange, 
  value, required, label }) => {
  return (
    <div className="d-flex flex-column normal-width-input mt-2">
      {label && (<label className={`${required ? 'required' : ''}`}>{label}</label>)}
      <InputPicker
        placeholder={placeholder}
        disabled={!checkNotEmpty(data)}
        data={data}
        defaultValue={value || ''}
        onChange={(value) => onChange(inputKey, value)}
        cleanable={false}
      />
      <span className={`input-message-error`}>Error message</span>
    </div>
  )
}
export default InputPicker