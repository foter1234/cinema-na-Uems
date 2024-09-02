import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://sqpmnvfdauytmrrtdfoc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxcG1udmZkYXV5dG1ycnRkZm9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MzY3MTgsImV4cCI6MjA0MDExMjcxOH0.pB4ru-NZiTbDHyLHp3G4M3fIjwFbS1LPJdqZg6xrMx0');



async function atualizar(id,nome,telefone, Status, evento) {
    const { data, error } = await supabase.from('cinema').update({ status: Status, nome:nome,telefone:telefone, evento_id: evento }).eq('id', id);

    if (error) {
        console.error('Erro ao atualizar status:', error);
        return;
    }

    console.log('Status atualizado com sucesso:', data);
}


document.getElementById('atualizar').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('polt').value;
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const evento = document.getElementById('eventos').value;

    const statusOcupado = 1;
    const { data, error } = await supabase.from('cinema').select('status').eq('id', id).single();
    const valstatus = data.status;

    if (error) {
            console.error('Erro ao buscar status:', error);
            return;
        }

    
    if(valstatus == 0){
    await atualizar(id,nome, telefone, statusOcupado, evento);

    }else if(valstatus == 1){
        alert("Não é possivel, pois está ocupada");
    }
    
});

document.getElementById('filme').addEventListener('change', function() {
    var selectedValue = this.value;
    document.getElementById('eventos').value = selectedValue;
  });


async function eventos() {
    const { data, error } = await supabase.from('eventos').select('id, nome');
    if (error) {
        console.error('Erro ao buscar dados:', error);
        return;
    }


const select = document.querySelector('#filme');
select.innerHTML = '';


data.forEach((evento, index) => {
  //  const op = document.createElement('option');
    const nome = document.createElement('option');
    nome.value = evento.id;
    nome.textContent = `${index + 1}. ${evento.nome}`;
   // op.appendChild(nome);


    select.appendChild(nome);
});
}

eventos();


