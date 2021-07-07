


========================= RestController

@Api(tags = "ordem-servico")
@RestController
@RequestMapping("/intranet/ordem-servico")
public class OrdemServicoRecurso {

    final Logger logger = LoggerFactory.getLogger(OrdemServicoRecurso.class);

    @Autowired
    private OrdemServicoServico ordemServicoServico;


 @ApiOperation(value = "Listar roteiros operacionais ativos")
    @RequestMapping(value = "/lista-roteiro-operacional", method = RequestMethod.GET, produces = { "application/json" })
    public ResponseEntity<?> listarRoteiroOperacional(FiltroRoteiroOperacional filtro) throws ExcecaoGenerica {
        try {
            logger.info("Lista os roteiros operacionais ativos.");

            filtro.setStatus(ROTEIRO_ATIVO);
            List<RoteiroOperacionalDTO> listaRoteiroOperacionalDTO = ordemServicoServico.listarRoteiroOperacionalFiltro(filtro);

            if (Objects.isNull(listaRoteiroOperacionalDTO))
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(listaRoteiroOperacionalDTO, HttpStatus.OK);

        } catch (Exception e) {
            logger.error("Recurso: OrdemServicoRecurso.listarRoteiroOperacional"+
                         "\n Erro ao listar roteiros operacionais ativos"+
                         "\n Exception:" + e.getMessage());

            throw new ExcecaoGenerica(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

}


================================= Service

@Service
public class OrdemServicoServico {

    private static Logger logger = Logger.getLogger(OrdemServicoServico.class);

    @Autowired
    private RoteiroOperacionalRepositorio roteiroOperacionalRepositorio;

    public List<RoteiroOperacionalDTO> listarRoteiroOperacionalFiltro(FiltroRoteiroOperacional filtro) throws ExcecaoGenerica {
        try {
            
            List<RoteiroOperacional> listaRoteiroOperacional = roteiroOperacionalRepositorio.listaRoteiroOperacionalFiltro(filtro);
            List<RoteiroOperacionalDTO> listaRoteiroOperacionalDTO = new RoteiroOperacionalDTO().addListaRoteiroOperacionalDTO(listaRoteiroOperacional);

            logger.info("Listar Roteiro Operacional realizada com sucesso.");

            return listaRoteiroOperacionalDTO;

        } catch (Exception e) {
            logger.error("Servico: OrdemServicoServico.listarRoteiroOperacional"+
                         "\n Objeto : EPROCESSO.(TAB_ROTEIRO_OPERACIONAL)"+
                         "\n Erro ao listar Roteiro Operacional" +
                         "\n Exception:" + e.getMessage());
        }

         throw new ExcecaoGenerica(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
    }

}    

============================= Repository

@Repository
public interface RoteiroOperacionalRepositorio extends JpaRepository<RoteiroOperacional, Long>, RoteiroOperacionalRepositorioCustom {

    public RoteiroOperacional findByIdRoteiroOperacional(Long pIdRoteiroOperacional);
    
    public List<RoteiroOperacional> findByStatus(Long pStatus);
    
    @Query(value = "SELECT R FROM RoteiroOperacional R "
                 + " WHERE R.idRoteiroOperacional in :idsRoteiro "
                 + " order by R.idRoteiroOperacional asc ")
    public List<RoteiroOperacional> listaRoteiroOperacional(@Param("idsRoteiro") List<Long> listaIdRoteiro);

}


============================= interface Repositorio Custom

public interface RoteiroOperacionalRepositorioCustom {

    public List<RoteiroOperacional> listaRoteiroOperacionalFiltro(FiltroRoteiroOperacional filtro);
}

============================= Repository

@Repository
@Transactional(readOnly = true)
public class RoteiroOperacionalRepositorioImpl implements RoteiroOperacionalRepositorioCustom {
    
    private static Logger logger = Logger.getLogger(RoteiroOperacionalRepositorioImpl.class);
    
    
    @PersistenceContext
    private EntityManager entityManager;
    private CriteriaBuilder criteria;
    private List<Predicate> predicates;

    @Override
    public List<RoteiroOperacional> listaRoteiroOperacionalFiltro(FiltroRoteiroOperacional filtro) {
           criteria = entityManager.getCriteriaBuilder();
           predicates = new ArrayList<>();

           CriteriaQuery<RoteiroOperacional> criteriaQueryOS = criteria.createQuery(RoteiroOperacional.class);
           Root<RoteiroOperacional> rootOS = criteriaQueryOS.from(RoteiroOperacional.class);

        try {
            if (Objects.nonNull(filtro.getIdRoteiroOperacional())) {
                predicates.add(criteria.equal(rootOS.get("idRoteiroOperacional"), filtro.getIdRoteiroOperacional()));
            }
            if (Objects.nonNull(filtro.getDescricaoRoteiroOperacional())) {
                predicates.add(criteria.like(criteria.upper(rootOS.get("descricaoRoteiroOperacional")),"%".concat(filtro.getDescricaoRoteiroOperacional()).concat("%")));
            }

            criteriaQueryOS.select(rootOS).where(criteria.or(predicates.toArray(new Predicate[predicates.size()])));

            List<RoteiroOperacional> listaRoteiroOperacional = entityManager.createQuery(criteriaQueryOS).getResultList();
                        
            return listaRoteiroOperacional;

        } catch (Exception e) {
            logger.error("Repositorio: RoteiroOperacionalRepositorioImpl.listaRoteiroOperacionalAtivosFiltro"+ 
                         "\n  Erro ao realizar a consulta por filtro do roteiro operacional ativos"+
                         "\n Objeto : EPROCESSO.TAB_ROTEIRO_OPERACIONAL"+
                         "\n Exception:" + e.getMessage());

            return null;
        }
    }

  }


====================================================================== DTO

  public class RoteiroOperacionalDTO implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    private Long idRoteiroOperacional;
    private String descricaoRoteiroOperacional;
    private Long status; 

    }

====================================================================== ENTITY

@Entity
@Table(name = "TAB_ROTEIRO_OPERACIONAL", schema = "eschema")
public class RoteiroOperacional {
    
    @Id
    @Column(name = "TRT_ID_ROTEIRO_OPERACIONAL")
    private Long idRoteiroOperacional;

    @Column(name = "TRT_DESCRICAO_ROTEIRO")
    private String descricaoRoteiroOperacional;    

    @Column(name = "TRT_STATUS")
    private Long status;

    public RoteiroOperacional(){}

---get
---set
.
.
.


 =========================================== tests


@Test
private void testListaTodos() {

    when(roteiroOperacionalRepositorio.listAll()).thenReturn(Object);

    //verifica se repository.listAll() foi chamado
}

