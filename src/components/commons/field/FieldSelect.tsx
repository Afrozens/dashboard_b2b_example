'use client';

import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import FieldError from './FieldError';
import type { Option, OptionsType } from '@/models/common';

type Props<T extends FieldValues> = {
  label: string;
  id: string;
  isMultiple: boolean;
  name: string;
  isRequired?: boolean;
  options?: OptionsType;
  error?: string;
  classAditional?: string;
  field?: ControllerRenderProps<T, Path<T>>;
  isDisabled?: boolean;
  placeholder?: string;
  isLoading?: boolean;
  defaultValue?: string;
  onChange?: ((newValue: string[] | string | null) => void)
};

const FieldSelect = <T extends FieldValues>({
  classAditional,
  label,
  id,
  error,
  isRequired,
  isMultiple,
  options,
  name,
  defaultValue,
  onChange,
  placeholder,
  field,
  isLoading,
  isDisabled = false,
  ...props
}: Props<T>) => {
  const animatedComponents = makeAnimated();
  const menuTarget = typeof document !== 'undefined' ? document.body : null;

  const onChangeSingle = (newValue: unknown | Option[] | Option) => {
    if (Array.isArray(newValue)) {
        const value = newValue.map((option) => String(option.value));
        field?.onChange(value);
        onChange?.(value);
    } else if ((newValue as Option).value !== undefined) {
        const singleValue = String((newValue as Option).value);
        field?.onChange(singleValue);
        onChange?.(singleValue);
    } else {
        field?.onChange(null);
        onChange?.(null);
    }
  };

  return (
    <div className={`${classAditional || ''} relative flex flex-col gap-2 w-full items-center`}>
      <div className='w-full relative items-center flex'>
        {label === '' ? null : (
        <label
          className={`text-black z-[2] font-semibold capitalize absolute left-10 top-3 text-xs -translate-y-1/2`}
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <Select
        className="w-full capitalize"
        name={name}
        isDisabled={isDisabled}
        required={isRequired}
        isLoading={isLoading}
        id={id}
        menuPosition="fixed"
        menuPlacement="auto"
        styles={{
          option: (styles, { isDisabled, isSelected, isFocused }) => ({
            ...styles,
            backgroundColor: isSelected ? '#FED553' : isFocused ? '#FED233' : '#fff',
            color: isSelected ? '#fff' : isFocused ? '#fff' : '#000',
            ':active': {
              ...styles[':active'],
              backgroundColor: !isDisabled
                ? isSelected
                  ? '#FED553'
                  : '#FED233'
                : undefined,
            },
          }),
          control: (base, state) => ({
            ...base,
            backgroundColor: error ? '#fef8f6' : 'rgb(249 249 249)',
            borderColor: error
              ? '#c13515'
              : state.isFocused
                ? 'rgb(72 135 239)'
                : '#d3d1d1',
            boxShadow: state.isFocused ? '0 0 0 2px rgb(72 135 239)' : 'none',
            paddingTop: '1rem',
            minHeight: '3rem',
            height: 'auto',
            flexWrap: 'wrap',
            outline: state.isFocused ? '2px solid transparent' : 'none',
            outlineOffset: state.isFocused ? '2px' : '0',
          }),
          singleValue: (base) => ({
            ...base,
            display: 'flex',
            alignItems: 'center',
          }),
          multiValue: (base) => ({
            ...base,
            margin: '2px',
          }),
          multiValueRemove: (base) => ({
            ...base,
            cursor: 'pointer',
          }),
          menuPortal: (base) => ({ ...base, zIndex: 99999 }),
        }}
        components={animatedComponents}
        isMulti={isMultiple}
        options={options}
        onChange={onChangeSingle}
        placeholder={placeholder}
        menuPortalTarget={menuTarget}
        value={options?.filter((option) => option.value === defaultValue)[0]}
        {...props}
      />
      </div>
      <FieldError error={error} />
    </div>
  );
};

export default FieldSelect;
