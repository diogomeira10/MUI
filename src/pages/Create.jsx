import { Button, Typography, TextField } from "@mui/material";
import { Container } from "@mui/material";
import { useTheme } from "@mui/material";
import { useState } from "react";
import { KeyboardArrowRight } from "@mui/icons-material";
import { Radio, RadioGroup, FormControl, FormLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Create() {

    const navigate = useNavigate()

    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [detailsError, setDetailsError] = useState(false);
    const [category, setCategory] = useState('todos');

    const handleSelectCategory = (event) => {
        setCategory(event.target.value);
        console.log('Category is', category)
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setTitleError(false);
        setDetailsError(false);

        if (title === '') {
            setTitleError(true);
        }
        if (details === '') {
            setDetailsError(true);
        }
        if (title && details) {
            console.log(title, details, category); // Now includes category
            axios.post('http://localhost:8000/notes', {
                title,
                details,
                category
            })

            navigate('/')
        }
    };

    const theme = useTheme();

    return (
        <Container size="sm">
            <Typography
                variant="h6"
                color="textSecondary"
                component="h2"
                gutterBottom
            >
                Create a New Note
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    onChange={(e) => setTitle(e.target.value)}
                    label="Note Title"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={titleError}
                    margin="normal"
                />
                <TextField
                    onChange={(e) => setDetails(e.target.value)}
                    label="Details"
                    variant="outlined"
                    color="secondary"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    error={detailsError}
                    margin="normal"
                />
                <FormControl >
                    <FormLabel>Category</FormLabel>
                    <RadioGroup value={category} onChange={handleSelectCategory}>  {/* Set default value and handle change */}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Radio color="secondary" value="outlined" label="Outlined" variant="outlined" />
                            <span style={{ marginLeft: "10px" }}>Money</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Radio color="secondary" value="soft" label="Soft" variant="soft" />
                            <span style={{ marginLeft: "10px" }}>Todos</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Radio color="secondary" value="solid" label="Solid" variant="solid" />
                            <span style={{ marginLeft: "10px" }}>Reminders</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Radio color="secondary" value="plain" label="Plain" variant="plain" />
                            <span style={{ marginLeft: "10px" }}>Work</span>
                        </div>
                    </RadioGroup>
                </FormControl>

                <Button
                    sx={{ display: 'flex' }}
                    type="submit"
                    color="secondary"
                    variant="contained"
                    endIcon={<KeyboardArrowRight />}
                >
                    Submit
                </Button>
            </form>
        </Container>
    );
}