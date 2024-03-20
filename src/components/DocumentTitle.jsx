import { Helmet } from "react-helmet";
const DocumentTitle = ({ title }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </>
  );
};

export default DocumentTitle;
