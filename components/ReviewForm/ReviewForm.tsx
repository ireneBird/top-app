import { ReviewFormProps } from './ReviewForm.props'
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm } from './reviewForm.interface';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IReviewForm>();

  const onSubmit = (data: IReviewForm) => {
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.form, className)} {...props}>
        <Input
          {...register('name', { required: { value: true, message: "Заполните имя" } })}
          placeholder='Имя'
          error={errors.name}
        />
        <Input
          {...register('title', { required: { value: true, message: "Заполните заголовок" } })}
          className={styles.title}
          placeholder='Заголовок отзыва'
          error={errors.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name='rating'
            rules={{ required: { value: true, message: "Оцените продукт" } }}
            render={({ field }) => (<Rating isEditable rating={field.value} ref={field.ref} error={errors.rating} setRating={field.onChange} />)}
          />

        </div>
        <Textarea
          {...register('description', { required: { value: true, message: "Заполните описание" } })}
          className={styles.textarea}
          placeholder='Текст отзыва'
          error={errors.description}
        />
        <div className={styles.submit}>
          <Button className={styles.button} appearance='primary'>Отправить</Button>
          <span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      <div className={styles.success}>
        <h4 className={styles.successTitle}>Ваш отзыв успешно отправлен</h4>
        <p>Спасибо, ваш отзыв будет опубликован после проверки</p>
        <CloseIcon className={styles.close} />
      </div>
    </form>
  )
}