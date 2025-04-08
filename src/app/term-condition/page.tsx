import React from 'react';

interface Term {
  title: string;
  content: string | string[];
}

const terms: Term[] = [
  {
    title: 'Acceptance of Terms',
    content: 'Your use of this website constitutes your acceptance of these terms and conditions, and any additional terms provided on specific pages of the site. If you do not agree to these terms, please discontinue use immediately.',
  },
  {
    title: 'User Accounts',
    content: 'To access certain features of our website, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.',
  },
  {
    title: 'User Conduct',
    content: 'You agree not to engage in any prohibited conduct, including but not limited to the following activities.',
  },
  {
    title: 'Unauthorised Access',
    content: ['Attempting to disrupt or access areas of the website without proper authorization.'],
  },
  {
    title: 'Malicious Use',
    content: ['Engaging in activities that harm the website, its users, or connected systems.'],
  },
  {
    title: 'Intellectual Property Infringement',
    content: ['Unauthorised use, reproduction, or distribution of protected content.'],
  },
  {
    title: 'Illegal Content',
    content: ['Posting or distributing illegal, defamatory, or obscene content.'],
  },
  {
    title: 'Spam and Phishing',
    content: ['Sending unsolicited messages or engaging in phishing attempts.'],
  },
];

const TermsPage: React.FC = () => {
  return (
    <div className='term-condition-section py-10'>
      <div className='container m-auto'>
        <h1>Welcome to western-overseas.com!</h1>
        <p>By accessing and using our website, you agree to comply with and be bound by the following terms and conditions. If you do not agree to these terms, please refrain from using our site.</p>
        {terms.map((term, index) => (
          <div key={index}>
            <h2>{term.title}</h2>
            {Array.isArray(term.content) ? (
              <ul>
                {term.content.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{term.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsPage;
