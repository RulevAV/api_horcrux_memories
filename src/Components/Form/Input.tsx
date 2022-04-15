import { Field, FieldProps } from "formik"

type PropsType = {
    label?: string
    name: string,
    className?:string,
    placeholder?:string,
    type?:string,
}

const Input: React.FC<PropsType> = ({ label, name, ...attribute }) => {
    return <div className="form-group">
        <Field name={name} >
            {({ field, meta }: FieldProps) => {
                return <>
                    <label htmlFor={name}>{label}</label>
                    <input id={name} {...attribute} {...field} className={"m-1 " + attribute.className} />
                    {meta.touched && meta.error ? (
                        <span className="form-text text-danger">{meta.error}</span>
                    ) : null}
                </>
            }}
        </Field>
    </div>
}

export default Input;