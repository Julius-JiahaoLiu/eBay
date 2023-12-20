package julius.king_of_bots.Controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin // Allow cross-origin requests
@RestController
@RequestMapping("/test")
public class TestController {
    
    @RequestMapping(value = "/firstMethod", method=RequestMethod.GET)
    public Map<String, String> firstMethod() {
        Map<String, String> map = Map.of("name", "apple", "score", "1000");
        return map;
    }
    
}
