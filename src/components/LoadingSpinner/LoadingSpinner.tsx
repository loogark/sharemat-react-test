import "./LoadingSpinner.css";

export const LoadingSpinner = () => {
  return (
    <div data-testid='loading-spinner' className='spinner-container'>
      <div className='spinner'></div>
    </div>
  );
};
