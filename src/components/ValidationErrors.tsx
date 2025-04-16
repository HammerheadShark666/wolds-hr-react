
interface IProps { 
  validationErrors: string[] | null; 
};

const ValidationError: React.FC<IProps> = ({ validationErrors}) => {

  return (
      <ul>
      {validationErrors?.map((validationError) => {      
        return (
          <li>{validationError}</li>
        )
      })}
    </ul>      
  )
}

export default ValidationError;

// TODO - style validation