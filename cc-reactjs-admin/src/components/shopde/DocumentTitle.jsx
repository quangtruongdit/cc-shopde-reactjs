
import { Helmet } from 'react-helmet';
import { PropTypes } from 'prop-types';

const DocumentTitle = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
}

DocumentTitle.prototype = {
    title: PropTypes.string.isRequired
}

export default DocumentTitle
