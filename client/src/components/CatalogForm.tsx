import React, { useState ,useContext, useEffect} from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Button, Box, Typography } from '@mui/material';
import { CatalogContext } from '../context/catalogContext';
import { Catalog } from '../types/catalog';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import validator from 'validator';



const CatalogForm = () => {


  
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const { addCatalog,catalogs,updateCatalog } = useContext(CatalogContext);

  const [catalog, setCatalog] = useState<Partial<Catalog>>({
    isPrime: false,
    locales: [],
  });
  const [nameError, setNameError] = useState<string | undefined>(undefined);
  const [currentLocal, setCurrentLocal] = useState<string | undefined>(undefined);
  const {catalogId}=useParams();

  const navigate = useNavigate();



  useEffect(() =>
    {
    
    if(catalogId){
      setIsCreate(false);
      const catalog = catalogs.find((catalog) => catalog._id === catalogId);
      if(catalog){
        setCatalog(catalog);
      }
    }    
  },[])


  const validateCatalog = (partialCatalog: Partial<Catalog>) => {
    if (!partialCatalog.name) {
      return false;
    }

    if (!partialCatalog.vertical) {
      return false;
    }

    return true;
    
  }


  const handleSubmit = () => {
    console.log("submit");
    if(isCreate)
    {
      addCatalog(catalog as Catalog);
    }
    else
    {
      updateCatalog(catalog as Catalog);
    }
    
    navigate('/');
  };
  const handleIsPrimeClicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCatalog({
        ...catalog,
        isPrime: !catalog.isPrime
    })
  }

  const nameAlreadyExists = (name: string) : boolean => {
    return catalogs.find((catalog) => catalog.name === name) !== undefined
    
    
  }
  const validatName = (name: string) => {

    if(name.length > 0 && !validator.isAlpha(name)) {
      setNameError("Name can only contain letters");
      return
    }
    if (nameAlreadyExists(name))
    {
      setNameError("Name already exists");
      return
    } 

    setNameError(undefined);


  }

  const runIndexing = () => {

    catalog.indexedAt = new Date().toJSON();
    setCatalog({
        ...catalog,
    })
  updateCatalog(catalog as Catalog);
  }

  const catalogNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCatalog({
        ...catalog,
        name: e.target.value
    })
    validatName(e.target.value);
  }
  const catalogVerticalChanged = (e:any) => {
    setCatalog({
        ...catalog,
        vertical: e.target.value
    })
  }
  const deleteLocal = (createdLocal: string) => {
    const newLocal = catalog?.locales?.filter((local) => local !== createdLocal);

    setCatalog({
        ...catalog,
        locales: newLocal
    })
  }


  return (
    <Box sx={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4)', borderRadius: '0.5rem',backgroundColor: 'white', display: 'flex', flexDirection: 'column',padding: '1.5rem',border: '2px solid black'}}>
      <IconButton sx={{color: 'black',marginRight: 'auto'}} aria-label="back"  onClick={() => navigate(-1)}>
        <ArrowBackIosIcon />
      </IconButton>
   

    {/* name input */}  
      <FormControl  margin="normal">
        <TextField
          label="Catalog Name"
          name="name"
          value={catalog?.name}
          onChange={catalogNameChanged}
          required
          {...(nameError && { error: true, helperText: nameError })}

        />
      </FormControl>

    {/* vertical input */}
      <FormControl  margin="normal">
        <InputLabel id="vertical-label">Vertical</InputLabel>
        <Select
          labelId="vertical-label"
          name="vertical"
          value={catalog?.vertical ?? ''}
          onChange={catalogVerticalChanged}
          required
        >
          <MenuItem value="home">home</MenuItem>
          <MenuItem value="general">general</MenuItem>
          <MenuItem value="fashion">fashion</MenuItem>
        </Select>
      </FormControl>
     
     {/* locales input */}
      <FormControl  margin="normal">
      <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <TextField
          label="Add local"
          name="add local"
          value={currentLocal ?? ''}
          onChange={(e) => setCurrentLocal(e.target.value)}

        />
        <Button onClick={() => {
          setCatalog({
            ...catalog,
            locales: [...(catalog.locales ?? []), currentLocal?.trim() ?? '']
          })

          setCurrentLocal(undefined)
        }}  variant="contained" color="primary">
          Add Local
        </Button>
        </Box>
      </FormControl>

      {catalog.locales &&   catalog.locales?.length > 0 && (
        <Stack direction="row" spacing={1}>
          {catalog.locales.map((local) => (
            <Chip
              key={local}
              label={local}
              onDelete={() => deleteLocal(local)}
            />
          ))}
        </Stack>
        )}

      {/* prime input */}
      <FormControlLabel
        sx={{color: 'black'}}
        control={
          <Checkbox
            name="isPrime"
            checked={catalog.isPrime}
            onChange={handleIsPrimeClicked}
          />
        }
        label="Prime"
      />

      {!isCreate && 
      <Box sx={{textAlign: 'left', my: '1rem',display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Box>
        <Typography sx={{color: 'black'}}>indexed at:</Typography>
        <Typography sx={{color: 'black'}}>{catalog?.indexedAt? new Date(catalog?.indexedAt).toLocaleString() : 'N/A'}
        </Typography>
      </Box>
      <Button sx={{fontSize: '0.7rem', padding: '0.1rem'}} onClick={runIndexing} variant="contained" color="primary">
        Run Indexing
      </Button>
      </Box>
      }

      {/* submition button */}
      <Button onClick={handleSubmit}  variant="contained" color="primary">
        {isCreate ? "Create Catalog" : "Update Catalog"}
      </Button>
      </Box>
  );
};

export default CatalogForm;
