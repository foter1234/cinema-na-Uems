import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://sqpmnvfdauytmrrtdfoc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxcG1udmZkYXV5dG1ycnRkZm9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MzY3MTgsImV4cCI6MjA0MDExMjcxOH0.pB4ru-NZiTbDHyLHp3G4M3fIjwFbS1LPJdqZg6xrMx0');




async function update(id,nome,telefone, Status) {
    const { data, error } = await supabase.from('cinema').update({ status: Status, nome:nome,telefone,telefone }).eq('id', id);

    if (error) {
        console.error('Erro ao atualizar status:', error);
        return;
    }

    console.log('Status atualizado com sucesso:', data);

}


document.getElementById('update-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('polt').value;
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;

    const statusOcupado = 1;
    const { data, error } = await supabase.from('cinema').select('status').eq('id', id).single();
    const valstatus = data.status;

    if (error) {
            console.error('Erro ao buscar status:', error);
            return;
        }

    
    if(valstatus == 0){
    await update(id,nome, telefone, statusOcupado);

    }else if(valstatus == 1){
        alert("Não é possivel, pois está ocupada");
    }
    
});

