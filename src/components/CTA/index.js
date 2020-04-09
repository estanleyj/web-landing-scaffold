import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';
import { trackEvent } from 'common/lib/analytics';

import styles from './styles.module.scss';

const CTA = ({ url = '#submit', label, onClick, children, className }) => {
  const data = useStaticQuery(graphql`
    query {
      gitBranch(current: { eq: true }) {
        id
        name
        commit
      }
    }
  `);

  return (
    <a
      className={cx('call-to-action', styles.CTA)}
      href={url}
      onClick={(e) => {
        trackEvent(trackEvent.EVENT__CLICK_CTA, data.gitBranch);
        onClick && onClick();
        if (/^#/.test(url)) {
          e.preventDefault();
          return false;
        }
      }}
    >
      {label}
      {children}
    </a>
  );
};

export default CTA;

CTA.propTypes = {
  label: PropTypes.string,
  url: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
