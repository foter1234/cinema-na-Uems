import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

    document.getElementById('nome').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('polt').value = '';
    
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


window.onload = async function() {
    const { data, error } = await supabase
        .from('cinema')
        .select('id, status');

    if (error) {
        console.error('Erro ao buscar os status das poltronas:', error);
        return;
    }

    data.forEach(poltrona => {
        const button = document.getElementById(poltrona.id);
        if (poltrona.status === 1) {
            //muda a cor para vermelho
            button.disabled = true;
            button.style.backgroundColor = 'red';
        }
    });
};
eventos();


