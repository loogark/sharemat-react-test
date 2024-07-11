interface Props {
  message?: string;
}

export const CustomError = ({ message }: Props) => {
  return (
    <div>
      {message && <h1>{message}</h1>}
      <h2>Sorry, Something went wrong!</h2>
    </div>
  );
};
