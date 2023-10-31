import styles from './TextInput.module.css'

type Props = {
	placeholder: string
	value: string
	onInput: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextInput = (props: Props) => {
	const {
		placeholder,
		value,
		onInput,
	}	= props

	return (
		<input
			className={styles.textInput}
			type="text"
			value={value}
			placeholder={placeholder}
			onInput={onInput}
		/>
	)
}
