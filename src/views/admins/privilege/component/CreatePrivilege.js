/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { styled } from '@mui/material/styles';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
// import 'primeflex/primeflex.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { SET_LOADING } from '../../../../store/actions';
import EditImage from './EditImage';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    color: 'purple',
    width: '100%',
    textAlign: 'center'
  }
}));

export default function CreateMembers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    pvl_name: '',
    pvl_point: 1,
    pvl_code: '',
    pvl_grop_level: [],
    pvl_limited_total: 1,
    pvl_limited_member: 1,
    pvl_date_start: new Date(),
    pvl_date_end: new Date(),
    pvl_detail: '',
    pvl_status: true,
    pvl_image: [],
    pvl_note: 'ไม่มี'
  });
  const [levels, setLevels] = React.useState([]);

  React.useEffect(async () => {
    const getLevel = await axios.get(
      `${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/level_members`,
      {
        headers: {
          secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
          token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
        }
      }
    );
    setLevels(getLevel.data.data);
  }, []);
  const onSelectTag = (e, value) => {
    const newLevels = [];
    value.forEach((element) => {
      newLevels.push(element._id);
    });
    setValues({ ...values, pvl_grop_level: newLevels });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const headleSubmit = async () => {
    if (
      !values.pvl_name ||
      !values.pvl_point ||
      !values.pvl_code ||
      values.pvl_grop_level.length === 0 ||
      !values.pvl_limited_total ||
      !values.pvl_limited_member ||
      !values.pvl_date_start ||
      !values.pvl_date_end ||
      !values.pvl_detail
    ) {
      Swal.fire({
        icon: 'info',
        title: 'กรอกข้อมูลไม่ครบ',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      const data = {
        pvl_image: values.pvl_image,
        pvl_grop_level: values.pvl_grop_level,
        pvl_name: values.pvl_name,
        pvl_point: values.pvl_point,
        pvl_code: values.pvl_code,
        pvl_limited_total: values.pvl_limited_total,
        pvl_limited_member: values.pvl_limited_member,
        pvl_date_start: values.pvl_date_start,
        pvl_date_end: values.pvl_date_end,
        pvl_detail: values.pvl_detail,
        pvl_status: values.pvl_status,
        pvl_note: values.pvl_note
      };
      console.log(data);
      Swal.fire({
        title: 'Are you sure ?',
        text: 'ต้องการเพิ่มข้อมูลสิทธิพิเศษใช่หรือไม่ ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
      }).then(async (result) => {
        if (result.isConfirmed) {
          dispatch({ type: SET_LOADING, loading: true });
          await axios
            .post(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/privilege`, data, {
              headers: {
                secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
                token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
              }
            })
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: 'ยืนยันการเพิ่มข้อมูล',
                showConfirmButton: false,
                timer: 1500
              });
              setTimeout(() => {
                navigate('/privilege', { replace: true });
              }, 1500);
            })
            .catch(() => {
              Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถเพิ่มข้อมูลได้',
                showConfirmButton: false,
                timer: 1500
              });
            });
          dispatch({ type: SET_LOADING, loading: false });
        }
      });
    }
  };

  const randomString = () => {
    let result = ' ';
    const charactersLength = characters.length;
    const array = [1, 2, 3, 4, 5, 6, 7, 8];
    array.map(() => (result += characters.charAt(Math.floor(Math.random() * charactersLength))));
    setValues({ ...values, pvl_code: result });
  };

  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (req) => {
    setValues({ ...values, pvl_detail: draftToHtml(convertToRaw(req.getCurrentContent())) });
    seteditorState(req);
  };

  const inputOneFile = async (event) => {
    dispatch({ type: SET_LOADING, loading: true });
    const valueImage = values.pvl_image;
    const formData = new FormData();
    formData.append('imgCollection', event.target.files[0]);
    await axios
      .post(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/uploadImage`, formData, {
        headers: {
          secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
          token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
        }
      })
      .then((res) => valueImage.push(res.data.image))
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'ไม่สามารถเพิ่มข้อมูลได้',
          showConfirmButton: false,
          timer: 1500
        });
      });
    await setTimeout(() => {
      setValues({ ...values, pvl_image: valueImage });
      dispatch({ type: SET_LOADING, loading: false });
    }, 1500);
  };
  return (
    <div>
      <>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom sx={{ m: 3 }}>
            เพิ่มสิทธิพิเศษ
          </Typography>
          <IconButton aria-label="delete" sx={{ m: 3 }}>
            <Icon icon="icomoon-free:exit" />
          </IconButton>
        </Stack>
        <List sx={{ p: '0px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel color="secondary" htmlFor="pvl_name">
                    ชื่อของรางวัล
                  </InputLabel>
                  <Input
                    color="secondary"
                    id="pvl_name"
                    value={values.pvl_name}
                    onChange={handleChange('pvl_name')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon icon="icon-park-solid:edit-name" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel color="secondary" htmlFor="pvl_point">
                    Point ที่ต้องใช้แลก
                  </InputLabel>
                  <Input
                    type="number"
                    color="secondary"
                    id="pvl_point"
                    value={values.pvl_point}
                    onChange={handleChange('pvl_point')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon icon="icon-park-twotone:edit-name" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel color="secondary" htmlFor="pvl_code">
                    โค้ดรางวัล
                  </InputLabel>
                  <Input
                    disabled
                    color="secondary"
                    id="pvl_code"
                    value={values.pvl_code}
                    // onChange={handleChange('pvl_code')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon icon="clarity:map-marker-solid-badged" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Button onClick={() => randomString()}>สุ่มใหม่</Button>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={8}>
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <Autocomplete
                    color="secondary"
                    multiple
                    id="checkboxes-tags-demo"
                    options={levels}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.lmb_name}
                    onChange={onSelectTag}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          color="secondary"
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.lmb_name}
                      </li>
                    )}
                    style={{ width: '100%' }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="กลุ่มสมาชิก"
                        placeholder="กลุ่มสมาชิก"
                        color="secondary"
                      />
                    )}
                  />
                </FormControl>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel color="secondary" htmlFor="pvl_limited_total">
                    จำนวนที่จำกัดทั้งหมด
                  </InputLabel>
                  <Input
                    color="secondary"
                    type="number"
                    id="pvl_limited_total"
                    value={values.pvl_limited_total}
                    onChange={handleChange('pvl_limited_total')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon icon="bxs:coin" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <ListItem disablePadding>
                <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
                  <InputLabel color="secondary" id="pvl_limited_member">
                    จำนวนที่จำกัดต่อ 1 ผู้ใช้งาน
                  </InputLabel>
                  <Input
                    color="secondary"
                    type="number"
                    id="pvl_limited_member"
                    value={values.pvl_limited_member}
                    onChange={handleChange('pvl_limited_member')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon icon="bxs:coin" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  {/* <InputLabel color="secondary" htmlFor="pvl_date_start">
                    pvl_date_start
                  </InputLabel>
                  <Input
                    color="secondary"
                    type="number"
                    id="pvl_date_start"
                    value={values.pvl_date_start}
                    onChange={handleChange('pvl_date_start')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon icon="bxs:coin" />
                      </InputAdornment>
                    }
                  /> */}
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <Grid item display="flex">
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <MobileDatePicker
                            label="วันที่เริ่ม"
                            value={values.pvl_date_start}
                            onChange={(newValue) => {
                              setValues({ ...values, pvl_date_start: newValue });
                            }}
                            // onChange={handleChange('pvl_date_start')}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <TimePicker
                            label="Time"
                            value={values.pvl_date_start}
                            onChange={(newValue) => {
                              setValues({ ...values, pvl_date_start: newValue });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Grid>
                      </Grid>
                    </Stack>
                  </LocalizationProvider>
                </FormControl>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <Grid item display="flex">
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <MobileDatePicker
                            label="สิ้นสุดสิทธิพิเศษ"
                            value={values.pvl_date_end}
                            onChange={(newValue) => {
                              setValues({ ...values, pvl_date_end: newValue });
                            }}
                            // onChange={handleChange('pvl_date_end')}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <TimePicker
                            label="Time"
                            value={values.pvl_date_end}
                            onChange={(newValue) => {
                              setValues({ ...values, pvl_date_end: newValue });
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Grid>
                      </Grid>
                    </Stack>
                  </LocalizationProvider>
                </FormControl>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel color="secondary" htmlFor="pvl_note">
                    Note หรือหมายเหตุ การใช้งานสิทธิพิเศษนี้(ใช้ก่อนวันที่หรือเงื่อนไขการใช้)
                  </InputLabel>
                  <Input
                    color="secondary"
                    id="pvl_note"
                    value={values.pvl_note}
                    onChange={handleChange('pvl_note')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon icon="icon-park-twotone:edit-name" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </ListItem>
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={2}>
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <ButtonStyled
                    component="label"
                    variant="contained"
                    htmlFor="account-settings-upload-image"
                  >
                    เพิ่มรูปภาพ
                    <input
                      hidden
                      type="file"
                      onChange={inputOneFile}
                      accept="image/png, image/jpeg"
                      id="account-settings-upload-image"
                    />
                  </ButtonStyled>
                </FormControl>
              </ListItem>
            </Grid>

            {values.pvl_image.length !== 0
              ? values.pvl_image.map((item) => (
                  <Grid item xs={6} sm={2} md={2} lg={1} key={item}>
                    <EditImage item={item} setValues={setValues} values={values} />
                  </Grid>
                ))
              : null}
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <h3 style={{ margin: '20px' }}>รายละเอียด</h3>
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <div style={{ backgroundColor: '#ffffff' }} className="Editer">
                    <Editor
                      editorState={editorState}
                      wrapperClassName=""
                      editorClassName=""
                      onEditorStateChange={onEditorStateChange}
                    />
                  </div>
                </FormControl>
              </ListItem>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <FormControlLabel
                    checked={values.pvl_status}
                    color="secondary"
                    onChange={(e) => setValues({ ...values, pvl_status: e.target.checked })}
                    control={<IOSSwitch sx={{ m: 1 }} />}
                    label="เปิดใช้งาน"
                  />
                </FormControl>
              </ListItem>
            </Grid>
            <ListItem disablePadding>
              <FormControl fullWidth variant="standard" sx={{ m: 1 }}>
                <Button
                  onClick={() => headleSubmit()}
                  color="secondary"
                  variant="contained"
                  sx={{
                    transition: '.2s transform ease-in-out',
                    borderRadius: '15px',
                    '&:hover': {
                      // border: '2px solid transparent',

                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  ยืนยันการเพิ่มข้อมูล
                </Button>
              </FormControl>
            </ListItem>
          </Grid>
        </List>
      </>
    </div>
  );
}
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? 'purple' : 'purple',
        opacity: 1,
        border: 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}));
