import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    with: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default ({ OnSelectChange }) => {
  // eslint-disable-next-line consistent-return
  const handleChange = (e) => {
    if (OnSelectChange) OnSelectChange(e.target.value);
  };

  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select native onChange={handleChange}>
        <option value="bank">Bancos</option>
        <option value="bar">Bares</option>
        <option value="bus_station">Pontos de ônibus</option>
        <option value="church">Igrejas</option>
        <option value="gas_station">Postos de combustível</option>
        <option value="parking">Parques</option>
        <option value="pharmacy">Farmácias</option>
        <option value="restaurant">Restaurantes</option>
      </Select>
    </FormControl>
  );
};
