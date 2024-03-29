import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import React__default, { useRef } from 'react';
import { NumberParser, NumberFormatter } from '@internationalized/number';
import { CarretDown } from '@strapi/icons';
import styled from 'styled-components';
import { useDesignSystem } from '../DesignSystemProvider.mjs';
import { KeyboardKeys } from '../helpers/keyboardKeys.mjs';
import { useControllableState } from '../hooks/useControllableState.mjs';
import { useId } from '../hooks/useId.mjs';
import { FieldInput } from '../Field/FieldInput.mjs';
import { Field } from '../Field/Field.mjs';
import { Flex } from '../Flex/Flex.mjs';
import { FieldLabel } from '../Field/FieldLabel.mjs';
import { Icon } from '../Icon/Icon.mjs';
import { FieldHint } from '../Field/FieldHint.mjs';
import { FieldError } from '../Field/FieldError.mjs';

const ArrowButton = styled.button`
  display: flex;
  height: 1rem;
  align-items: ${({ reverse }) => (reverse ? 'flex-end' : 'flex-start')};
  transform: translateY(${({ reverse }) => (reverse ? `-2px` : `2px`)});
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : undefined)};
  svg {
    display: block;
    height: ${4 / 16}rem;
    transform: ${({ reverse }) => (reverse ? 'rotateX(180deg)' : undefined)};
  }
`;
const INITIAL_VALUE = '';
const NumberInput = React__default.forwardRef(({ size = 'M', startAction, name, hint, error, label, labelAction, locale: defaultLocale, id, onValueChange, value, step = 1, required = false, disabled = false, ...props }, ref) => {
    const generatedId = useId(id);
    const designContext = useDesignSystem('NumberInput');
    const locale = defaultLocale || designContext.locale;
    const numberParserRef = useRef(new NumberParser(locale, { useGrouping: false }));
    const numberFormaterRef = useRef(new NumberFormatter(locale, { maximumFractionDigits: 20, useGrouping: false }));
    const [inputValue, setInputValue] = useControllableState({
        prop(currentInputValue) {
            const stringifiedValue = String(value);
            /**
             * This basically accounts for when someone wants to:
             * 1. clear the input
             * 2. use a minus value
             * 3. use a decimal value
             *
             * And always give it a string
             */
            return isNaN(Number(stringifiedValue)) || (stringifiedValue !== currentInputValue && currentInputValue !== '')
                ? currentInputValue
                : numberFormaterRef.current.format(Number(value));
        },
        defaultProp: INITIAL_VALUE,
        onChange(value) {
            /**
             * always return a
             */
            const parsedValue = numberParserRef.current.parse(value ?? '');
            onValueChange(isNaN(parsedValue) ? undefined : parsedValue);
        },
    });
    /**
     * Value will either be a number or a string,
     * if the former then it'll be converted to a string.
     */
    const formatNumberAndSetInput = (value) => {
        setInputValue(String(value));
    };
    const handelInputChange = ({ target: { value } }) => {
        if (numberParserRef.current.isValidPartialNumber(value)) {
            formatNumberAndSetInput(value);
        }
    };
    const increment = () => {
        if (!inputValue) {
            formatNumberAndSetInput(step);
            return;
        }
        const parsedValue = numberParserRef.current.parse(inputValue);
        const newValue = isNaN(parsedValue) ? step : parsedValue + step;
        formatNumberAndSetInput(numberFormaterRef.current.format(newValue));
    };
    const decrement = () => {
        if (!inputValue) {
            formatNumberAndSetInput(-step);
            return;
        }
        const parsedValue = numberParserRef.current.parse(inputValue);
        const newValue = isNaN(parsedValue) ? -step : parsedValue - step;
        formatNumberAndSetInput(numberFormaterRef.current.format(newValue));
    };
    const handleKeyDown = (e) => {
        if (disabled)
            return;
        switch (e.key) {
            case KeyboardKeys.DOWN: {
                e.preventDefault();
                decrement();
                break;
            }
            case KeyboardKeys.UP: {
                e.preventDefault();
                increment();
                break;
            }
        }
    };
    /**
     * Only format on blur as vanity because otherwise it breaks when a user
     * wants to include a minus or decimal value.
     */
    const handleBlur = () => {
        if (inputValue) {
            const parsedValue = numberParserRef.current.parse(inputValue);
            const formattedValue = isNaN(parsedValue) ? '' : numberFormaterRef.current.format(parsedValue);
            formatNumberAndSetInput(formattedValue);
        }
    };
    return (jsx(Field, { name: name, hint: hint, error: error, id: generatedId, required: required, children: jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [label && jsx(FieldLabel, { action: labelAction, children: label }), jsx(FieldInput, { ref: ref, startAction: startAction, disabled: disabled, type: "text", inputMode: "decimal", onChange: handelInputChange, onKeyDown: handleKeyDown, onBlur: handleBlur, value: inputValue, size: size, endAction: jsxs(Fragment, { children: [jsx(ArrowButton, { disabled: disabled, "aria-hidden": true, reverse: true, onClick: increment, tabIndex: -1, type: "button", "data-testid": "ArrowUp", children: jsx(Icon, { as: CarretDown, color: "neutral500" }) }), jsx(ArrowButton, { disabled: disabled, "aria-hidden": true, onClick: decrement, tabIndex: -1, type: "button", "data-testid": "ArrowDown", children: jsx(Icon, { as: CarretDown, color: "neutral500" }) })] }), ...props }), jsx(FieldHint, {}), jsx(FieldError, {})] }) }));
});

export { NumberInput };
