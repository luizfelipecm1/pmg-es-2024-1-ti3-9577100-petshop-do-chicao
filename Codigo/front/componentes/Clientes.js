import { useState, useEffect } from 'react';
import { Input } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Container } from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react';
import axios from 'axios';
import DadosCliente from './DadosCliente';

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState(null); // Estado para armazenar o cliente selecionado

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get('http://localhost:8081/clientes');
                setClientes(response.data);
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            }
        };

        fetchClientes();
    }, []);

    // Função para lidar com o clique em uma linha da tabela
    const handleClienteClick = (cliente) => {
        setClienteSelecionado(cliente);
    };

    return (
        <Container maxW='auto'>
            <Flex marginBottom='15px'>
                <Flex minWidth='max-content' alignItems='center'>
                    <Input placeholder='Search' borderRight='0px' borderRadius='lg' borderRightRadius='0px' />
                    <IconButton backgroundColor='white' aria-label='Search database' border='1px' borderLeft='0px' borderColor='gray.200' borderRadius='lg' borderLeftRadius='0px' icon={<SearchIcon />} />
                </Flex>
                <Spacer />
                <Button colorScheme='red' size='md' borderRadius='lg'>
                    Novo Cliente
                </Button>
            </Flex>

            <TableContainer border='1px' borderColor='gray.200' borderRadius='lg' padding='10px'>
                <Table variant='striped' colorScheme='gray'>
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th>E-mail</Th>
                            <Th isNumeric>Telefone</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {clientes.map((cliente, index) => (
                            <Tr key={index} onClick={() => handleClienteClick(cliente)}> {/* Adiciona o evento de clique na linha */}
                                <Td width='auto'>{cliente.nome}</Td>
                                <Td width='auto'>{cliente.email}</Td>
                                <Td isNumeric width='auto'>{cliente.telefone}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            {clienteSelecionado && (
                <DadosCliente cliente={clienteSelecionado} /> // Renderiza o formulário apenas se um cliente estiver selecionado
            )}
        </Container>
    );
}
