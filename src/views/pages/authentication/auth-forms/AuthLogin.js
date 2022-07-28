/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './AuthLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// project imports
import useScriptRef from '../../../../hooks/useScriptRef';
import AnimateButton from '../../../../ui-component/extended/AnimateButton';

import Google from '../../../../assets/images/icons/social-google.svg';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const scriptedRef = useScriptRef();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleLogin = async (values) => {
    const data = {
      member_phone_number: values.phone,
      member_password: values.password
    };
    const headerConfig = {
      headers: {
        secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
        token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
      }
    };
    await axios
      .post(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/login_members`, data, headerConfig)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          html: '<p style="font-size: 20px">Happy Point ยินดีต้อนรับ</p>',
          showConfirmButton: false,
          timer: 2000
        });
        setTimeout(() => {
          navigate('/', { replace: true });
          window.location.reload(false);
        }, 2000);
        localStorage.setItem('members', JSON.stringify(res.data.data));
      })
      .catch(async (error) => {
        const newData = {
          email: data.member_phone_number,
          password: data.member_password
        };
        const headerConfig = {
          headers: {
            secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
            token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
          }
        };
        await axios
          .post(`${process.env.REACT_APP_WEB_SERVICE_BACKEND}/auth`, newData, headerConfig)
          .then((res) => {
            Swal.fire({
              icon: 'success',
              html: '<p style="font-size: 20px">Happy Point ยินดีต้อนรับ</p>',
              showConfirmButton: false,
              timer: 2000
            });
            setTimeout(() => {
              navigate('/', { replace: true });
              window.location.reload(false);
            }, 2000);
            localStorage.setItem('admins', JSON.stringify(res.data.data));
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: 'info',
              html: '<p style="font-size: 20px">เบอร์โทรศัพท์หรือรหัส ไม่ถูกต้อง</p>',
              showConfirmButton: false,
              timer: 2000
            });
          });
      });
  };

  const Clickme = async () => {
    console.log(`${process.env.REACT_APP_NBA_SECRET_KEY}`);
    axios
      .get('http://localhost:9000/api/happy-point/members', {
        headers: {
          secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
          token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
        }
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              <div className="wellcome-text">Welcome to NBA Happy Point</div>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Button onClick={() => Clickme()}>Clickme</Button>
      {/*  {isfile && <img src={isfile} />} */}

      <Formik
        initialValues={{
          phone: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          phone: Yup.string()
            .min(2, 'สั้นเกินไป!')
            .max(50, 'ยาวเกินไป!')
            .required('กรุณากรอกข้อมูลให้ครบ'),
          password: Yup.string().max(255).required('กรุณากรอกรหัสผ่านด้วย')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              handleLogin(values);

              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl
              fullWidth
              error={Boolean(touched.phone && errors.phone)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-phone-login">
                เบอร์โทรศัพท์หรือชื่อผู้ใช้งาน
              </InputLabel>
              <OutlinedInput
                color="secondary"
                id="outlined-adornment-phone-login"
                type="string"
                value={values.phone}
                name="phone"
                onBlur={handleBlur}
                onChange={handleChange}
                // label="Email Address / Username"
                inputProps={{}}
              />
              {touched.phone && errors.phone && (
                <FormHelperText error id="standard-weight-helper-text-phone-login">
                  {errors.phone}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password-login">รหัสผ่าน</InputLabel>
              <OutlinedInput
                color="secondary"
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: 'none', cursor: 'pointer' }}
              >
                ลืมรหัสผ่าน ?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  เข้าสู่ระบบ
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
