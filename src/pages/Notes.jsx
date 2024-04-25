import { useEffect, useState } from "react"
import axios from "axios"
import { Container, Grid, Paper } from "@mui/material"
import { NoteCard } from "../components/NoteCard"

export default function Notes() {

    const [notes, setNotes] = useState([])
    console.log(notes)

    useEffect(() => {
        
        axios.get('http://localhost:8000/notes')
            .then(response => {
                setNotes(response.data);
            })
            .catch(error => {
                console.error('Error fetching notes:', error);
            });
    }, [])

    const renderedNotes = notes.map((note, id) => {
        return (
            <Grid md={6} xs={12} lg={4} key={note.id}>
                <NoteCard title={note.title}/>
            </Grid>
        )
    })


    return <Container style={{ color: 'black' }}>
        <h1>Notes</h1>
        <Grid container>
            {renderedNotes}
        </Grid>


        {/* <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
                <Paper>1</Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Paper>2</Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Paper>3</Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Paper>4</Paper>
            </Grid>
        </Grid> */}

    </Container>
}