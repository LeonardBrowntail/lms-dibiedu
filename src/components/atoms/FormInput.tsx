type FormInputAttributes = {
	label: string;
	name: string;
	type: string;
	disabled?: boolean;
	value: string;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => unknown;
	error?: string | null;
};

export default function FormInput({
	label,
	name,
	type,
	disabled,
	value,
	handleChange,
	error,
}: FormInputAttributes) {
	return (
		<div className="flex flex-col">
			{error && <small className="text-red-500">{error}</small>}
			<input
				type={type}
				name={name}
				disabled={disabled}
				value={value}
				onChange={handleChange}
				placeholder={label}
				className={`bg-background border px-3 py-0.5 rounded-xl ${error ? "border-red-500" : ""}`}
			/>
		</div>
	);
}
