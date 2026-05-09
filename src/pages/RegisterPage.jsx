import styles from '../styles/LoginPage.module.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z.object ({
    fullname: z.string().min(1, 'กรุณากรอกชื่อ-นามสกุล'),
    username: z.string()
        .min(3, 'ต้องมี 3-12 ตัวอักษร')
        .max(12, 'ต้องมี 3-12 ตัวอักษร')
        .regex(/^[a-zA-Z0-9]+$/, 'ต้องเป็นภาษาอังกฤษหรือตัวเลขเท่านั้น'),
    email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง'),
    password: z.string().min(8,'ต้องมีความยาวอย่างน้อย 8 ตัวอักษร'),
    confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'รหัสผ่านไม่ตรงกัน',
    });

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
     } = useForm({
        resolver: zodResolver(registerSchema),
     });

    const onSubmit = (data) => {
        console.log(data);
        alert('สมัครสมาชิคสำเร็จ!');
    };

return (
    <div className={styles.container}>
        <h2 className={styles.title}>สมัครสมาชิก</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formCard}>

            <div className={styles.inputGroup}>
                <label className={styles.label}>ชื่อ-นามสกุล</label>
                <input {...register('fullname')} className={styles.input} />
                {
                    errors.fullname && <span className={styles.errorText}>{errors.fullname.message}</span>
                }
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>ชื่อผู้ใช้ Username</label>
                <input {...register('username')} className={styles.input}/>
                {
                    errors.username && <span className={styles.errorText}>{errors.username.message}</span>
                }
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>อีเมล (Email)</label>
                <input type="email" {...register('email')} className={styles.input} />
                {
                    errors.email && <span className={styles.errorText}>{errors.email.message}</span>
                }
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>รหัสผ่าน (Password)</label>
                <input type='password' {...register('password')} className={styles.input} />
                {
                    errors.password && <span className={styles.errorText}>{errors.password.message}</span>
                }
            </div>
            <div className={styles.inputGroup}>
                <label className={styles.label}>ยืนยันรหัสผ่าน</label>
                <input type='password' {...register('confirmPassword')} className={styles.input} />
                {
                    errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword.message}</span>
                }
            </div>

            <button type='submit' className={styles.submitButton}>สมัครสมาชิก</button>
        </form>
    </div>
)
};
