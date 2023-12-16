package julius.king_of_bots.Controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/test")
public class TestController {
    
    @RequestMapping(value = "/firstMethod", method=RequestMethod.GET)
    public String firstMethod() {
        System.out.println("Hello World");
        return "Hello World, just testing";
    }
    
}
