

## Plano: Centralizar Intranet entre duas linhas com ícone de cadeado

O objetivo é remover o link "Intranet" da lista de links rápidos e colocá-lo em uma seção própria, centralizado entre duas linhas horizontais, com um ícone de cadeado ao lado.

### Estrutura visual desejada

```text
─────────────────────────────────────
        🔒 Intranet
─────────────────────────────────────
  © 2026 Mota & Advogados Associados...
```

### Alterações no arquivo `src/components/Footer.tsx`

1. Remover o `<li>` do "Intranet" da lista de links rápidos (linhas 56-60)
2. Importar o ícone `Lock` do `lucide-react`
3. Adicionar uma nova seção entre o grid de colunas e o copyright, com:
   - Uma linha horizontal superior (`border-t`)
   - O texto "Intranet" centralizado com o ícone `Lock` ao lado, como link clicável para `https://dev.motaeadvogados.com.br/`
   - A linha horizontal inferior já existente (a do copyright)

