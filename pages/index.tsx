import { useState } from 'react';
import { Button, Htag, P, Rating, Tag } from '../components';
import { withLayout } from '../layout/Layout';

function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4)
  return (
    <>
      <Htag tag='h1'>Hello world</Htag>
      <Button appearance='primary'>Узнать подробнее</Button>
      <Button appearance='ghost' arrow='right'>Узнать подробнее</Button>

      <P size='l'>Большой</P>
      <P size='m'>Средний</P>
      <P size='s'>Маленький</P>

      <Tag >Ghost</Tag>
      <Tag color='red'>Ghost</Tag>
      <Tag color='green'>Ghost</Tag>
      <Tag color='primary'>Ghost</Tag>
      <Tag color='grey' size='m'>Ghost</Tag>

      <Rating rating={rating} isEditable setRating={setRating} />
    </>
  );
}

export default withLayout(Home)