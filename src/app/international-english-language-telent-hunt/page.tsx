import React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';

interface Section {
  headingTag: 'h1' | 'h2' | 'h3';
  title: string;
  content: string | string[] | Prize[];
}

interface Prize {
  rank: string;
  amount: string;
}

const prizeHeaders: string[] = [
  'Number of prizes drawn (Each district)',
  'Prize value (Each district)'
];

const sections: Section[] = [
  {
    headingTag: 'h1',
    title: 'International English Language Talent Hunt',
    content:
      "International English Language Talent Hunt (IELTH) is an aptitude test powered by Western Overseas to assess students' English aptitude and comprehension skills. The main aim and objective of the IELTH test is to take English language learning to the next level. This test is a fantastic way to see what students have learned. Also, it will help to plan what they can learn in the future.",
  },
  {
    headingTag: 'h2',
    title: 'Benefits of the IELTH test:',
    content: [
      'A holistic solution to check English proficiency.',
      'It identifies what the child is capable of.',
      'Reduce test anxiety among students.',
      'Test of vocabulary and word choice they have learned.',
      'Assesses how students will apply their knowledge in different contexts of English.',
      'Determine individual abilities in Writing skills.',
    ],
  },
  {
    headingTag: 'h2',
    title: 'What more do you need to know about the test?',
    content:
      'After reading its purpose and benefits, proceed to how successfully it gets conducted. IELTH is an excellent initiative Western Overseas took for completing level 1 and level 2 exams for school students (Class - XII). Firstly, it will be conducted in two states, i.e. Haryana and Punjab, in 2022. Also, It covered most of the districts of these two states, such as Karnal, Kurukshetra, Ambala, Sonipat, Patiala, Bathinda, Amritsar, and others. Every district covered approx 100 schools to participate in the IELTH test. Both government and private schools are equally allowed to participate in this test. The excellent cooperation of schools played a massive role in making this event successful. Moreover, Western Overseas plans to cover other districts and states in the upcoming tests. Stay tuned with Western Overseas to get these kinds of latest updates.',
  },
  {
    headingTag: 'h3',
    title: 'LEVEL - I',
    content:
      'It is the first step to participating in the competition. The 12th-class students from different schools in each district participated in the test. In this phase, the test is designed to analyze students\' vocabulary, interpretation, and aptitude at a very basic level. Those qualifying at this level are given a golden ticket to enter Level II. A participation certificate is given to all the aspirants to encourage them.',
  },
  {
    headingTag: 'h3',
    title: 'LEVEL - II',
    content:
      'It is the second step of the IELTH test. In this phase, the qualifiers of level I get a chance to move ahead toward victory. Level II is conducted at a common venue for each district. Apart from the vocabulary, interpretation, and aptitude analysis, the writing module is also added to evaluate the different text structures, fluency & coherence, and ideas. From level II, the three winners were selected from each district for further appreciation.',
  },
  {
    headingTag: 'h2',
    title: 'Awards and Recognitions:',
    content: [
      { rank: 'First (1st) Rank', amount: 'Rs. 51,000 INR' },
      { rank: 'Second (2nd) Rank', amount: 'Rs. 21,000 INR' },
      { rank: 'Third (3rd) Rank', amount: 'Rs. 11,000 INR' },
    ],
  },
  {
    headingTag: 'h2',
    title: '',
    content:
      'The International English Language Talent Hunt is a fantastic opportunity for school students to assess their English skills with valid certifications and prizes. It is a golden chance for aspirants who want to go abroad for higher studies. Also, they can ask queries from experienced professionals for doubt clarification. Western Overseas would love to hear from you if you want to know more.',
  },
];

const TalentHunt: React.FC = () => {
  return (
    <div className='talenthunt-container py-10'>
      <div className='container m-auto'>
        {sections.map((section, index) => (
          <div key={index}>
            {React.createElement(section.headingTag, {}, section.title)}
            {Array.isArray(section.content) ? (
              typeof section.content[0] === 'string' ? (
                <ul>
                  {(section.content as string[]).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      {prizeHeaders.map((header, i) => (
                        <TableHead key={i}>{header}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(section.content as Prize[]).map((prize, i) => (
                      <TableRow key={i}>
                        <TableCell>{prize.rank}</TableCell>
                        <TableCell>{prize.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )
            ) : (
              <p>{section.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TalentHunt;
