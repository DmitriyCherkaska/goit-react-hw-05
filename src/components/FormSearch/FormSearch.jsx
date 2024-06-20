// import style from './SearchForm.module.css';
import { Field, Form, Formik } from 'formik';

const FormSearch = ({ submit }) => {
  const handleSubmit = (values, actions) => {
    const textInput = values.text.trim();
    submit(textInput);
    actions.resetForm();
  };

  return (
    <Formik initialValues={{ text: '' }} onSubmit={handleSubmit}>
      <Form>
        <Field type="text" name="text" placeholder="Search movie..." />
        <div>
          <button type="submit">Search</button>
        </div>
      </Form>
    </Formik>
  );
};
export default FormSearch;
