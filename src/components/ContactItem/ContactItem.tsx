import css from './ContactItem.module.css';

interface IProps {
  name: string;
  number: string,
  onDelete: () => void
}

export const ContactItem = ({ name, number, onDelete }: IProps) => {
  return (
    <>
      <p>
        {name}: {number}
      </p>
      <button className={css.button} type="button" onClick={onDelete}>
        Delete
      </button>
    </>
  );
};

