import axios from 'axios';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Button, Htag, Input, P, Rating, Tag, Textarea } from '../components';
import { MenuItem } from '../interfaces/menu.interface';
import { withLayout } from '../layout/Layout';

function Home({ menu }: HomeProps): JSX.Element {
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
      <Input placeholder='text some' />
      <Textarea placeholder='sss sdaqwds d' />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;

  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  })

  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number
};