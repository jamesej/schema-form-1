import React, { useCallback } from 'react';
import { ComponentForType } from 'components/component-for-type'
import { ISchemaContainerProps, ActionType } from 'components/schema-form-interfaces'
import { ErrorObject } from 'error'
import { fieldCaption, emptyValue } from 'schema/schema'

export function SchemaFormArray({
    schema,
    path,
    value,
    errors,
    onChange,
    onFocus,
    onBlur,
    onEditor,
    context
}: ISchemaContainerProps): React.ReactElement {
    const itemSchema = schema['items'];
    const valueArray = (value || []) as object[];
    const pathEl = path.length ? path[path.length - 1] : '';
    const arrayClass = path.length === 0 ? "" : "sf-array sf-" + pathEl;
    const count = valueArray.length;
    const updatable = !(schema['readOnly'] || false);

    // const handleChange = useCallback(
    // (i: number) => (newValue: object, path: string[], action?: ActionType) => {
    //     const newValueArray = [ ...valueArray ];
    //     newValueArray[i] = newValue;
    //     onChange(newValueArray, path, action);
    // }, [valueArray, onChange]);

    const handleDelete = (i: number, path: string[]) => {
        return () => {
            const newValueArray = [ ...valueArray ];
            newValueArray.splice(i, 1);
            onChange(newValueArray, path.slice(0, -1), ActionType.Delete);
        }
    };

    const handleUp = (i: number, path: string[]) => {
        return () => {
            const newValueArray = [ ...valueArray ];
            const mover = newValueArray[i];
            newValueArray[i] = newValueArray[i - 1];
            newValueArray[i - 1] = mover;
            onChange(newValueArray, path.slice(0, -1), ActionType.Up);
        }
    };

    const handleDown = (i: number, path: string[]) => {
        return () => {
            const newValueArray = [ ...valueArray ];
            const mover = newValueArray[i];
            newValueArray[i] = newValueArray[i + 1];
            newValueArray[i + 1] = mover;
            onChange(newValueArray, path.slice(0, -1), ActionType.Down);
        }
    };

    const handleAdd = () => {
        onChange(
            [ ...valueArray, emptyValue(itemSchema) ],
            path,
            ActionType.Create
        );
    };

    function arrayElement(v: object, i: number) {
        const newPath = [ ...path, `${i}` ];
        const newErrors = (errors instanceof ErrorObject) ? errors[`${i}`] : [];

        return (
        <div className="sf-element" key={i}>
            <ComponentForType
                schema={itemSchema as object}
                path={newPath}
                value={v}
                errors={newErrors}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onEditor={onEditor}
                context={context}
            />
            {updatable && <div className="sf-array-buttons">
                <span className="sf-control-button sf-delete-button oi" onClick={handleDelete(i, newPath)}>x</span>
                {i > 0 && <span className="sf-control-button sf-up-button oi" onClick={handleUp(i, newPath)}>^</span>}
                {i < count - 1 && <span className="sf-control-button sf-down-button oi" onClick={handleDown(i, newPath)}>v</span>}
            </div>}
        </div>);
    }

    return (
        <div className={arrayClass}>
            <div className="sf-title">{fieldCaption(schema, path) || '\u00A0'}</div>
            <fieldset className="sf-array-fieldset">
                {valueArray.map((v, i) => arrayElement(v, i))}
            </fieldset>
            {updatable && <span className="sf-control-button sf-add-button" onClick={handleAdd}>+</span>}
        </div>
    );
}