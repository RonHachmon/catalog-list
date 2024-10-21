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
  const { addCatalog,catalogs,updateCatalog,primeCatalogId } = useContext(CatalogContext);

  const [catalog, setCatalog] = useState<Partial<Catalog>>({
    isPrime: false,
    locales: [],
  });
  const [nameError, setNameError] = useState<string | undefined>(undefined);
  const [currentLocal, setCurrentLocal] = useState<string | undefined>(undefined);
  const {catalogId}=useParams();

  const navigate = useNavigate();



  const initilizeCatalog = () => {
        
    if(catalogId)
    {
      setIsCreate(false);
      const catalog = catalogs.find((catalog) => catalog._id === catalogId);
      const isPrime = catalogId === primeCatalogId

      if(catalog)
      {
          setCatalog({...catalog,isPrime});
      }
    }
  }   
  
  

  useEffect(() =>
    {
      initilizeCatalog(); 
  },[])




  const handleSubmit = () => {
    const filledCatalog =catalog as Catalog
    isCreate ? addCatalog(filledCatalog) : updateCatalog(filledCatalog);
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
      return false;
    }
    if (nameAlreadyExists(name))
    {
      setNameError("Name already exists");
      return false;
    } 

    setNameError(undefined);
    return true;


  }

  const runIndexing = () => {

    catalog.indexedAt = new Date().toJSON();
    setCatalog({
        ...catalog,
    })
  updateCatalog(catalog as Catalog);
  }

  const catalogNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if(validatName(newName)){
      setCatalog({
        ...catalog,
        name: newName
    })
      
    }

    
  }
  const addedLocal = () => {
    const newLocal = currentLocal?.trim()
    if ( newLocal!= '')
    {
      setCatalog({
        ...catalog,
        locales: [...(catalog.locales ?? []), currentLocal?.trim() ?? '']
      })
      setCurrentLocal(undefined)
    }
  }
  const catalogVerticalChanged = (e:any) => {
    const newVertical = e.target.value;

    setCatalog({
        ...catalog,
        vertical: newVertical
    })
  }
  const deleteLocal = (createdLocal: string) => {
    const newLocal = catalog?.locales?.filter((local) => local !== createdLocal);

    setCatalog({
        ...catalog,
        locales: newLocal
    })
  }
  const isValidCategory = () => {
    if(catalog.name == null ||  catalog.name == '' || nameError !== undefined){
      return false;
      
    }
    if(catalog.vertical == null){
      return false;
    }
    return true;
    
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
        <Button variant="contained" color="primary" onClick={() => addedLocal} >
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
      <Button onClick={runIndexing} variant="contained" color="primary">
        Run Indexing
      </Button>
      </Box>
      }

      {/* submition button */}
      <Button disabled={!isValidCategory()} onClick={handleSubmit}  variant="contained" color="primary">
        {isCreate ? "Create Catalog" : "Update Catalog"}
      </Button>
      </Box>
  );
};

export default CatalogForm;
