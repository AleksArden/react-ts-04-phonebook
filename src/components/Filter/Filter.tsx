import css from './Filter.module.css';

interface IProps {
  value: string,
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
}

export const Filter = ({ onChange, value }: IProps) => {
  return (
    <label className={css.label}>
      Find contacts by name
      <input
        className={css.input}
        type="text"
        name="filter"
        onChange={onChange}
        value={value}
      />
    </label>
  );
};
