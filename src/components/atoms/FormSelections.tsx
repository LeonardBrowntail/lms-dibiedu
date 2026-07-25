export default function FormSelection({
	error,
	onChange,
}: {
	error?: string;
	onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
	return (
		<div className="field">
			<label>Role</label>
			{error && <small className="error-text">{error}</small>}
			<select
				required
				name="role"
				onChange={onChange}
				className={`border px-3 py-0.5 rounded-xl ${error ? "border-button-red" : ""}`}
			>
				<option value="student">Student</option>
				<option value="instructor">Instructor</option>
			</select>
		</div>
	);
}
