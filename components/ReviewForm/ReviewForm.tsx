import { ReviewFormProps } from './ReviewForm.props'
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './reviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({ productId, isOpened, className, ...props }: ReviewFormProps): JSX.Element => {
  const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId })
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError("что-то пошло не так");
      }
    } catch (e) {
      setError("Что-то пошло не так, обновите страницу");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.form, className)} {...props}>
        <Input
          {...register('name', { required: { value: true, message: "Заполните имя" } })}
          placeholder='Имя'
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={!!errors.name}
        />
        <Input
          {...register('title', { required: { value: true, message: "Заполните заголовок" } })}
          className={styles.title}
          placeholder='Заголовок отзыва'
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={!!errors.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name='rating'
            rules={{ required: { value: true, message: "Оцените продукт" } }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                ref={field.ref}
                error={errors.rating}
                setRating={field.onChange}
                tabIndex={isOpened ? 0 : -1}
              />)}
          />

        </div>
        <Textarea
          {...register('description', { required: { value: true, message: "Заполните описание" } })}
          className={styles.textarea}
          placeholder='Текст отзыва'
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
          aria-label='Текст отзыва'
          aria-invalid={!!errors.description}
        />
        <div className={styles.submit}>
          <Button
            className={styles.button}
            appearance='primary'
            tabIndex={isOpened ? 0 : -1}
            onClick={() => clearErrors()}
          >Отправить
          </Button>
          <span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {
        isSuccess && <div role='alert' className={cn(styles.messagePanel, styles.success)}>
          <h4 className={styles.successTitle}>Ваш отзыв успешно отправлен</h4>
          <p>Спасибо, ваш отзыв будет опубликован после проверки</p>
          <button
            onClick={() => setIsSuccess(false)}
            className={styles.buttonClose}
            aria-label='Закрыть оповещение'
          >
            <CloseIcon />
          </button>
        </div>
      }
      {
        error && <div role='alert' className={cn(styles.messagePanel, styles.error)}>
          {error}
          <button
            onClick={() => setError(undefined)}
            className={styles.buttonClose}
            aria-label='Закрыть оповещение'
          >
            <CloseIcon />
          </button>
        </div>
      }

    </form>
  )
}