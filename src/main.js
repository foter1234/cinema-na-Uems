import { createClient } from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


async function atualizar(id, nome, telefone, status, evento) {
    const { data, error } = await supabase
        .from('cinema')
        .update({ status: status, nome: nome, telefone: telefone, evento_id: evento })
        .eq('id', id);

    if (error) {
        console.error('Erro ao atualizar status:', error);
        return;
    }

    console.log('Status atualizado com sucesso:', data);
}

// Função para obter o nome do evento
async function obterNomeDoEvento(eventoId) {
    const { data, error } = await supabase.from('eventos').select('nome').eq('id', eventoId).single();

    if (error) {
        console.error('Erro ao buscar nome do evento:', error);
        return '';
    }

    return data.nome;
}

async function assentosOcupados(eventoId) {
    const { data, error } = await supabase
        .from('cinema')
        .select('id, status')
        .eq('evento_id', eventoId);

    if (error) {
        console.error('Erro ao buscar os status das poltronas:', error);
        return [];
    }

    return data.filter(poltrona => poltrona.status === 1).map(poltrona => poltrona.id);
}

async function gerarAssentos(assentoOcupado) {
    const seatMap = document.getElementById('seat-map');
    const seatInput = document.getElementById('polt');
    const total = 120; 

    for (let i = 1; i <= total; i++) {
        const seat = document.createElement('button');
        seat.textContent = i;
        seat.classList.add('w-8', 'h-8', 'rounded', 'transition-colors', 'hover:scale-110', 'duration-500');

        if (assentoOcupado.includes(i)) {
            seat.classList.add('bg-red-800', 'cursor-not-allowed');
            seat.disabled = true;
        } else {
            seat.classList.add('bg-slate-500', 'hover:bg-yellow-500');
            seat.addEventListener('click', function () {
                const selected = seatMap.querySelector('.bg-green-600');
                if (selected) {
                    selected.classList.remove('bg-green-600');
                    selected.classList.add('bg-slate-500');
                }
                seat.classList.remove('bg-slate-500');
                seat.classList.add('bg-green-600');
                seatInput.value = seat.textContent;
            });
        }
        seatMap.appendChild(seat);
    }
}

async function ultimoEvento() {
    const { data, error } = await supabase
        .from('eventos')
        .select('id, nome, data, hora, duracao')
        .order('id', { ascending: false })
        .limit(1)
        .single();

    if (error) {
        console.error('Erro ao buscar o último evento:', error);
        return null;
    }

    const eventoInfo = document.getElementById('evento-info');
    eventoInfo.innerHTML = `
        <h2>nome: ${data.nome}</h2>
        <p><strong>Data:</strong> ${new Date(data.data).toLocaleDateString()}</p>
        <p><strong>hora:</strong> ${data.hora}</p>
        <p><strong>Duração:</strong> ${data.duracao} minutos</p>
    `;

    return data.id;
}

document.getElementById('atualizar').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const id = document.getElementById('polt').value;
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const evento = await ultimoEvento();
 
    const { data, error } = await supabase.from('cinema').select('status').eq('id', id).single();
    const valstatus = data.status;

    if (error) {
        console.error('Erro ao buscar status:', error);
        return;
    }

    if (valstatus == 0) {
        const statusOcupado = 1;
        await atualizar(id, nome, telefone, statusOcupado, evento);
        const nomeEvento = await obterNomeDoEvento(evento);
        alert(`Reserva realizada com sucesso!\n\nEvento: ${nomeEvento}\nNome: ${nome}\nTelefone: ${telefone}\nAssento: ${id}`);
        document.getElementById('atualizar').reset();
        window.location.reload(true)
//        const seatMap = document.getElementById('seat-map');
//        seatMap.innerHTML = '';
    } else if (valstatus == 1) {
        alert("Não é possível, pois a poltrona está ocupada.");
    }
});

window.onload = async function () {
    const ultimoEventoId = await ultimoEvento();
    if (ultimoEventoId) {
        const occupiedSeats = await assentosOcupados(ultimoEventoId);
        gerarAssentos(occupiedSeats);
    }
};
