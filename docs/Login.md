# Login
## React hook form
https://react-hook-form.com/

```js
const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
```

```js
<form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
    <div className="flex flex-col gap-5">
        <div className="field-wrapper">
        <label htmlFor="email" className="field-label">
            E-mail
        </label>
        <input
            className={classNames("field-input", {
            "field-input--error": errors.email,
            })}
            id="email"
            type="text"
            placeholder="Your E-mail address"
            {...register("email", {
            required: true,
            pattern: /^\S+@\S+$/i,
            })}
        />
        </div>
        <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
            <PasswordInput
            id="password"
            placeholder="Your password"
            error={errors.password}
            innerRef={field.ref}
            isInvalid={errors.password}
            value={field.value}
            onChange={field.onChange}
            />
        )}
        />
    </div>
    <div className="flex flex-col items-center gap-6 mt-4 mb-10">
        <button className="text-btn" onClick={handlePasswordReminder}>
        Forgot Password?
        </button>
        <button className="btn btn--primary w-full">Log In</button>
    </div>
</form>
```

